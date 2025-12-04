import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '@app/common/entities/booking.entity';
import { Repository, LessThan, MoreThan, Between } from 'typeorm';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';
import { User } from '@app/common/entities/user.entity';
import { Room } from '@app/common/entities/room.entity';
import { UpdateBookingDto } from '@app/common/dtos/update-booking.dto';
import { BookingProducer } from './producers/booking.producer';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Room)
    private roomRepo: Repository<Room>,

    private producer: BookingProducer,
  ) {}

  async createBooking(dto: CreateBookingDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    const room = await this.roomRepo.findOne({ where: { id: dto.roomId } });

    if (!user) throw new NotFoundException('User not found');
    if (!room) throw new NotFoundException('Room not found');

    const start = new Date(dto.startTime);
    const end = new Date(dto.endTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new BadRequestException('Invalid start or end time');
    }

    if (end <= start) {
      throw new BadRequestException('End time must be after start time');
    }

    if (room.premium && !user.isPremium) {
      throw new ForbiddenException('Premium rooms require premium membership');
    }

    if (!user.isPremium) {
      if (!this.isBusinessHours(start) || !this.isBusinessHours(end)) {
        throw new ForbiddenException('Regular users can book only during business hours');
      }
    }

    const overlapping = await this.bookingRepo.findOne({
      where: {
        room: { id: room.id },
        startTime: LessThan(end),
        endTime: MoreThan(start),
      },
      relations: ['room'],
    });

    if (overlapping) {
      throw new ConflictException('Room is not available in the selected time range');
    }

    const guests = Array.isArray(dto.guests)
      ? dto.guests.filter((g) => typeof g === 'string' && g.trim().length > 0)
      : [];

    const booking = this.bookingRepo.create({
      user,
      room,
      startTime: start,
      endTime: end,
      guests,
      confirmationToken: randomUUID(),
    });

    await this.bookingRepo.save(booking);
    const saved = await this.bookingRepo.findOne({
      where: { id: booking.id },
      relations: ['user', 'room'],
    });

    // Send RMQ event to email microservice
    if (saved) {
      this.producer.bookingCreated(saved);
    }

    return saved;
  }

  async confirmBooking(bookingId: string, token?: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['user', 'room'],
    });

    if (!booking) throw new NotFoundException('Booking not found');

    if (token && booking.confirmationToken && booking.confirmationToken !== token) {
      throw new ForbiddenException('Invalid confirmation token');
    }

    booking.confirmed = true;
    booking.confirmationToken = undefined;

    await this.bookingRepo.save(booking);
    const updated = await this.bookingRepo.findOne({
      where: { id: booking.id },
      relations: ['user', 'room'],
    });

    if (updated) {
      this.producer.bookingConfirmed(updated);
    }

    return updated;
  }

  async getRooms() {
    return this.roomRepo.find();
  }

  async updateBooking(dto: UpdateBookingDto) {
    console.log('[updateBooking] incoming dto:', dto);
    const booking = await this.bookingRepo.findOne({
      where: { id: dto.bookingId },
      relations: ['user', 'room'],
    });
    if (!booking) {
      console.error('[updateBooking] booking not found', dto.bookingId);
      throw new NotFoundException('Booking not found');
    }

    const user = booking.user;

    // Resolve room: use provided or current
    let room = booking.room;
    if (dto.roomId && dto.roomId !== booking.room.id) {
      const found = await this.roomRepo.findOne({ where: { id: dto.roomId } });
      if (!found) throw new NotFoundException('Room not found');
      room = found;
    }

    const start = dto.startTime ? new Date(dto.startTime) : booking.startTime;
    const end = dto.endTime ? new Date(dto.endTime) : booking.endTime;

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new BadRequestException('Invalid start or end time');
    }

    if (end <= start) {
      throw new BadRequestException('End time must be after start time');
    }

    if (room.premium && !user.isPremium) {
      throw new ForbiddenException('Premium rooms require premium membership');
    }

    if (!user.isPremium) {
      if (!this.isBusinessHours(start) || !this.isBusinessHours(end)) {
        throw new ForbiddenException('Regular users can book only during business hours');
      }
    }

    // Overlap check excluding current booking
    const overlapping = await this.bookingRepo
      .createQueryBuilder('b')
      .leftJoin('b.room', 'room')
      .where('room.id = :roomId', { roomId: room.id })
      .andWhere('b.id != :bookingId', { bookingId: booking.id })
      .andWhere('b.startTime < :end', { end })
      .andWhere('b.endTime > :start', { start })
      .getOne();
    if (overlapping) {
      console.error('[updateBooking] overlap found with booking', overlapping.id);
      throw new ConflictException('Room is not available in the selected time range');
    }

    booking.room = room;
    booking.startTime = start;
    booking.endTime = end;
    if (dto.guests) {
      booking.guests = Array.isArray(dto.guests)
        ? dto.guests.filter((g) => typeof g === 'string' && g.trim().length > 0)
        : booking.guests;
    }

    // Require re-confirmation after any update
    booking.confirmed = false;
    booking.confirmationToken = randomUUID();

    await this.bookingRepo.save(booking);
    const updated = await this.bookingRepo.findOne({
      where: { id: booking.id },
      relations: ['user', 'room'],
    });
    console.log('[updateBooking] updated booking', updated?.id);

    // Emit update event (re-send confirmation/reminder email with new details)
    if (updated) {
      this.producer.bookingUpdated(updated);
    }
    return updated;
  }

  async createUser(dto: CreateUserDto) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('User already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      ...dto,
      password: hashed,
      isPremium: dto.isPremium ?? false,
    });
    return this.userRepo.save(user);
  }

  async findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async getUpcomingReminders(windowMinutes = 5) {
    const now = new Date();
    const targetStart = now.getTime() + windowMinutes * 60 * 1000;

    // Use a narrow ±30s window around the target (4:30-5:30 minutes from now) to avoid immediate sends
    const windowStart = new Date(targetStart - 30 * 1000);
    const windowEnd = new Date(targetStart + 30 * 1000);

    // Start reminders: confirmed bookings starting soon
    const startReminders = await this.bookingRepo.find({
      where: {
        confirmed: true,
        startTime: Between(windowStart, windowEnd),
      },
      relations: ['user', 'room'],
    });

    // Checkout reminders: confirmed bookings ending soon
    const endReminders = await this.bookingRepo.find({
      where: {
        confirmed: true,
        endTime: Between(windowStart, windowEnd),
      },
      relations: ['user', 'room'],
    });

    return { startReminders, endReminders };
  }

  private isBusinessHours(date: Date) {
    const day = date.getUTCDay(); // 0 Sun, 6 Sat
    const hour = date.getUTCHours();
    if (day === 0 || day === 6) return false;
    return hour >= 9 && hour < 17;
  }
}

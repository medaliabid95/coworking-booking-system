import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '@app/common/entities/booking.entity';
import { Repository, LessThan, MoreThan } from 'typeorm';
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

    // Enforce business hours for regular users (Mon-Fri, 09:00-17:00)
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

    const booking = this.bookingRepo.create({
      user,
      room,
      startTime: start,
      endTime: end,
      guests: dto.guests || [],
      confirmationToken: randomUUID(),
    });

    const saved = await this.bookingRepo.save(booking);

    // Send RMQ event to email microservice
    this.producer.bookingCreated(saved);

    return saved;
  }

  async confirmBooking(bookingId: string, token?: string) {
    const booking = await this.bookingRepo.findOne({ where: { id: bookingId } });

    if (!booking) throw new NotFoundException('Booking not found');

    if (token && booking.confirmationToken && booking.confirmationToken !== token) {
      throw new ForbiddenException('Invalid confirmation token');
    }

    booking.confirmed = true;
    booking.confirmationToken = undefined;

    const updated = await this.bookingRepo.save(booking);

    this.producer.bookingConfirmed(updated);

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
    if (dto.guests) booking.guests = dto.guests;

    const updated = await this.bookingRepo.save(booking);
    console.log('[updateBooking] updated booking', updated.id);
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

  private isBusinessHours(date: Date) {
    const day = date.getUTCDay(); // 0 Sun, 6 Sat
    const hour = date.getUTCHours();
    if (day === 0 || day === 6) return false;
    return hour >= 9 && hour < 17;
  }
}

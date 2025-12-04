import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '@app/common/entities/booking.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';
import { User } from '@app/common/entities/user.entity';
import { Room } from '@app/common/entities/room.entity';
import { BookingProducer } from './producers/booking.producer';

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

    const booking = this.bookingRepo.create({
      user,
      room,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
    });

    const saved = await this.bookingRepo.save(booking);

    // Send RMQ event to email microservice
    this.producer.bookingCreated(saved);

    return saved;
  }

  async confirmBooking(bookingId: string) {
    const booking = await this.bookingRepo.findOne({ where: { id: bookingId } });

    if (!booking) throw new NotFoundException('Booking not found');

    booking.confirmed = true;

    const updated = await this.bookingRepo.save(booking);

    this.producer.bookingConfirmed(updated);

    return updated;
  }
}

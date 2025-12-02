// booking-service/src/bookings/bookings.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { RoomsService } from '../rooms/rooms.service';
import { UsersService } from '../users/users.service';
import { EmailProducer } from '../producers/email.producer';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private roomsService: RoomsService,
    private usersService: UsersService,
    private emailProducer: EmailProducer,
  ) {}

  // ----------------------
  // Create Booking
  // ----------------------
  async createBooking(dto: CreateBookingDto) {
    const start = new Date(dto.startTime);
    const end = new Date(dto.endTime);

    // User validation
    const user = await this.usersService.getUser(dto.userId);
    if (!user) throw new NotFoundException('User not found');

    // Membership rule
    const allowed = this.usersService.validateBookingHours(user, start);
    if (!allowed) {
      throw new BadRequestException(
        'Regular users can only book during business hours',
      );
    }

    // Room availability
    const available = await this.roomsService.checkAvailability(
      dto.roomId,
      start,
      end,
    );

    if (!available) {
      throw new BadRequestException('Room is not available');
    }

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        roomId: dto.roomId,
        userId: dto.userId,
        startTime: start,
        endTime: end,
        guests: {
          create: dto.guests.map(email => ({ email })),
        },
      },
      include: {
        Room: true,
        User: true,
        guests: true,
      },
    });

    // Emit event to email service
    this.emailProducer.sendBookingCreated({
      bookingId: booking.id,
      userEmail: booking.User.email,
      guests: dto.guests,
      startTime: booking.startTime,
    });

    return {
      message: 'Booking created. Please confirm via email.',
      bookingId: booking.id,
    };
  }

  // ----------------------
  // Confirm Booking
  // ----------------------
  async confirmBooking(bookingId: number) {
    const booking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { confirmed: true },
      include: { User: true, guests: true, Room: true },
    });

    // Notify email service
    this.emailProducer.sendBookingConfirmed(booking);

    return { message: 'Booking confirmed', booking };
  }
}

import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Booking } from '@app/common/entities/booking.entity';

@Injectable()
export class BookingProducer {
  private client: ClientProxy;
  private confirmationBase = process.env.FRONTEND_URL || 'http://localhost:3000';

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'email_queue',
      },
    });
  }

  bookingCreated(booking: Booking) {
    const confirmationLink = booking.confirmationToken
      ? `${this.confirmationBase}/confirm?bookingId=${booking.id}&token=${booking.confirmationToken}`
      : undefined;

    this.client.emit('booking_created', {
      bookingId: booking.id,
      userId: booking.user?.id,
      userEmail: booking.user?.email,
      roomId: booking.room?.id,
      roomName: booking.room?.name,
      confirmationToken: booking.confirmationToken,
      confirmationLink,
      startTime: booking.startTime,
      endTime: booking.endTime,
      guests: booking.guests,
    });
  }

  bookingConfirmed(booking: Booking) {
    this.client.emit('booking_confirmed', {
      bookingId: booking.id,
      userId: booking.user?.id,
      userEmail: booking.user?.email,
      roomId: booking.room?.id,
      roomName: booking.room?.name,
      startTime: booking.startTime,
      endTime: booking.endTime,
      guests: booking.guests,
    });
  }
}

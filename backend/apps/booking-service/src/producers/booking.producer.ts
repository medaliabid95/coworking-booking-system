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
  private confirmationBase =
    process.env.CONFIRM_BASE_URL ||
    (process.env.API_BASE_URL ? `${process.env.API_BASE_URL}/api` : undefined) ||
    (process.env.FRONTEND_URL ? `${process.env.FRONTEND_URL}/api` : undefined) ||
    'http://localhost:3000/api';

  constructor() {
    const rmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue: 'email_queue',
      },
    });
  }

  bookingCreated(booking: Booking) {
    if (!booking?.user?.email) {
      console.error('[booking-producer] Missing user email for booking_created', booking?.id);
      return;
    }
    const confirmationLink = booking.confirmationToken
      ? `${this.confirmationBase}/bookings/confirm?bookingId=${booking.id}&token=${booking.confirmationToken}`
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
    if (!booking?.user?.email) {
      console.error('[booking-producer] Missing user email for booking_confirmed', booking?.id);
      return;
    }
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

  bookingUpdated(booking: Booking) {
    if (!booking?.user?.email) {
      console.error('[booking-producer] Missing user email for booking_updated', booking?.id);
      return;
    }
    const confirmationLink = booking.confirmationToken
      ? `${this.confirmationBase}/bookings/confirm?bookingId=${booking.id}&token=${booking.confirmationToken}`
      : undefined;

    this.client.emit('booking_updated', {
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
}

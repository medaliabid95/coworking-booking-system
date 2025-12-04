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
    this.client.emit('booking_created', booking);
  }

  bookingConfirmed(booking: Booking) {
    this.client.emit('booking_confirmed', booking);
  }
}

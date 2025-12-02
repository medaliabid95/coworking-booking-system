import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmailProducer {
  constructor(
    @Inject('EMAIL_SERVICE') private readonly emailClient: ClientProxy,
  ) {}

  sendBookingCreated(booking: any) {
    return this.emailClient.emit('booking_created', booking);
  }

  sendBookingConfirmed(booking: any) {
    return this.emailClient.emit('booking_confirmed', booking);
  }
}
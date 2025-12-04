import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailService } from '../mailer/email.service';

@Controller()
export class BookingConfirmedConsumer {
  constructor(private emailService: EmailService) {}

  @EventPattern('booking_confirmed')
  async handleBookingConfirmed(data: any) {
    console.log('[email-service] booking_confirmed received for booking', data?.bookingId);
  }

  @EventPattern('booking_updated')
  async handleBookingUpdated(data: any) {
    console.log('[email-service] booking_updated received for booking', data?.bookingId);
    await this.emailService.sendConfirmationEmail(data);
  }
}

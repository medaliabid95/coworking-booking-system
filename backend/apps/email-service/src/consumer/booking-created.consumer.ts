import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailService } from '../mailer/email.service';

@Controller()
export class BookingCreatedConsumer {
  constructor(private emailService: EmailService) {}

  @EventPattern('booking_created')
  async handleBookingCreated(data: any) {
    console.log('[email-service] booking_created received for booking', data?.bookingId);
    await this.emailService.sendConfirmationEmail(data);
  }
}

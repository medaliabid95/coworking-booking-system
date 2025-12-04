import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailService } from '../mailer/email.service';

@Controller()
export class BookingConfirmedConsumer {
  constructor(private emailService: EmailService) {}

  @EventPattern('booking_confirmed')
  async handleBookingConfirmed(data: any) {
    console.log('[email-service] booking_confirmed received for booking', data?.bookingId);
    // Do not send a reminder immediately; confirmation email already sent on create/update
    // This handler is intentionally no-op for reminders to avoid premature sends
  }

  @EventPattern('booking_updated')
  async handleBookingUpdated(data: any) {
    console.log('[email-service] booking_updated received for booking', data?.bookingId);
    // Reuse confirmation email flow when booking details change
    await this.emailService.sendConfirmationEmail(data);
  }
}

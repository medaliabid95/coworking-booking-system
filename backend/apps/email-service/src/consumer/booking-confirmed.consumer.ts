import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailService } from '../mailer/email.service';

@Controller()
export class BookingConfirmedConsumer {
  constructor(private emailService: EmailService) {}

  @EventPattern('booking_confirmed')
  async handleBookingConfirmed(data: any) {
    await this.emailService.sendReminderEmail(data);
  }
}

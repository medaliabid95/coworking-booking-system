import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './mailer/email.service';

@Controller()
export class EmailServiceController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('booking_created')
  async handleBookingCreated(@Payload() booking: any) {
    await this.emailService.sendConfirmationEmail(booking);
  }

  @EventPattern('booking_confirmed')
  async handleBookingConfirmed(@Payload() booking: any) {
    await this.emailService.sendReminderEmail(booking);
  }
}

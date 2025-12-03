import { Controller } from '@nestjs/common';
import { EmailService } from './email-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EmailServiceController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('booking_created')
  async handleBookingCreated(@Payload() booking: any) {
    await this.emailService.handleBookingCreated(booking);
  }
}

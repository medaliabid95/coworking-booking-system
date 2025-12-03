import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST', 'smtp.gmail.com'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  @EventPattern('booking_created')
  async handleBookingCreated(@Payload() booking: any) {
    // Log received event
    this.logger.log(`Received booking event: ${JSON.stringify(booking)}`);

    // Validate payload
    if (!booking?.user?.email || !booking?.room?.name) {
      this.logger.error(
        'Invalid booking payload, missing user email or room name.',
      );
      return;
    }

    // Validate and convert dates
    const startTime = new Date(booking.startTime);
    const endTime = new Date(booking.endTime);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      this.logger.error('Invalid startTime or endTime in booking payload.');
      return;
    }

    // Prepare email HTML
    const html = `
      <h3>Booking Confirmation</h3>
      <p>Room: ${booking.room.name}</p>
      <p>Date: ${startTime.toLocaleDateString()}</p>
      <p>Time: ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}</p>
    `;

    // Send email
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_USER'),
        to: booking.user.email,
        subject: 'Booking Confirmation',
        html,
      });

      this.logger.log(`Confirmation email sent to ${booking.user.email}`);
    } catch (err) {
      this.logger.error(`Failed to send email: ${err}`);
    }
  }
}

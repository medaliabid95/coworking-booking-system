import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './mailer/email.service';
import { EmailServiceController } from './email-service.controller';
import { BookingCreatedConsumer } from './consumer/booking-created.consumer';
import { BookingConfirmedConsumer } from './consumer/booking-confirmed.consumer';
import { RemindersScheduler } from './schedulers/reminders.scheduler';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: process.env.SMTP_HOST
        ? {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            auth: process.env.SMTP_USER
              ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
              : undefined,
          }
        : { jsonTransport: true }, // dev fallback: log emails to console
      defaults: { from: process.env.SMTP_FROM || 'no-reply@example.com' },
    }),
  ],
  controllers: [EmailServiceController, BookingCreatedConsumer, BookingConfirmedConsumer],
  providers: [EmailService, RemindersScheduler],
})
export class EmailServiceModule {}

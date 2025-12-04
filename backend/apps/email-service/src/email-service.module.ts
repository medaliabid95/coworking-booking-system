import { Module } from '@nestjs/common';
import { EmailService } from './mailer/email.service';
import { BookingCreatedConsumer } from './consumer/booking-created.consumer';
import { BookingConfirmedConsumer } from './consumer/booking-confirmed.consumer';
import { RemindersScheduler } from './schedulers/reminders.scheduler';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    EmailService,
    BookingCreatedConsumer,
    BookingConfirmedConsumer,
    RemindersScheduler,
  ],
})
export class EmailServiceModule {}

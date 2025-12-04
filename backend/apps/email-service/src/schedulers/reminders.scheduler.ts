import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from '../mailer/email.service';

@Injectable()
export class RemindersScheduler {
  private readonly logger = new Logger(RemindersScheduler.name);

  constructor(private emailService: EmailService) {}

  @Cron('* * * * *') // every minute
  async handleReminders() {
    this.logger.log('Checking for reminder emails...');

    // In real usage: call booking-service via RMQ to get upcoming reminders

    // Example:
    // const upcoming = await bookingClient.send('get_upcoming_reminders', {}).toPromise();

    // for (const booking of upcoming) {
    //   await this.emailService.sendReminderEmail(booking);
    // }
  }
}

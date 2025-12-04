import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from '../mailer/email.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RemindersScheduler {
  private readonly logger = new Logger(RemindersScheduler.name);
  private bookingClient: ClientProxy;

  constructor(private emailService: EmailService) {
    const rmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    this.bookingClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: { urls: [rmqUrl], queue: 'booking_queue' },
    });
  }

  @Cron('* * * * *') // every minute
  async handleReminders() {
    this.logger.log('Checking for reminder emails...');

    try {
      const { startReminders = [], endReminders = [] } =
        (await lastValueFrom(this.bookingClient.send('get_upcoming_reminders', {}))) || {};

      this.logger.log(
        `Reminders window -> start: ${startReminders.length} bookings, checkout: ${endReminders.length} bookings`,
      );

      for (const booking of startReminders) {
        await this.emailService.sendReminderEmail({
          ...booking,
          userEmail: booking.user?.email,
          roomName: booking.room?.name,
        });
      }

      for (const booking of endReminders) {
        await this.emailService.sendCheckoutEmail({
          ...booking,
          userEmail: booking.user?.email,
          roomName: booking.room?.name,
        });
      }
    } catch (err) {
      this.logger.error('Failed to fetch/send reminders', err);
    }

    // Example:
    // const upcoming = await bookingClient.send('get_upcoming_reminders', {}).toPromise();

    // for (const booking of upcoming) {
    //   await this.emailService.sendReminderEmail(booking);
    // }
  }
}

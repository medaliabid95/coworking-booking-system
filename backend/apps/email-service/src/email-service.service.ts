import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailer: MailerService) {}

  async sendConfirmationEmail(data: any) {
    await this.mailer.sendMail({
      to: data.userEmail,
      subject: 'Booking Confirmation',
      template: './confirmation-email',
      context: {
        name: data.userName,
        room: data.roomName,
        date: data.date,
        start: data.startTime,
        end: data.endTime,
        guests: data.guests,
        link: data.confirmationLink,
      },
    });
  }

  async sendReminderEmail(data: any) {
    await this.mailer.sendMail({
      to: data.recipients,
      subject: 'Meeting Reminder',
      template: './reminder-email',
      context: {
        room: data.roomName,
        date: data.date,
        time: data.time,
      },
    });
  }

  async sendCheckoutEmail(data: any) {
    await this.mailer.sendMail({
      to: data.userEmail,
      subject: 'Meeting Checkout Reminder',
      template: './checkout-email',
      context: {
        room: data.roomName,
        date: data.date,
        end: data.endTime,
      },
    });
  }
}

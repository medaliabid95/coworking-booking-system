import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailer: MailerService) {}

  async sendConfirmationEmail(data: any) {
    const guests = Array.isArray(data.guests) ? data.guests.join(', ') : data.guests || 'No guests';
    const html = `
      <p>Your booking has been created${data.confirmationLink ? ' and needs confirmation' : ''}.</p>
      <ul>
        <li>Room: ${data.roomName || 'N/A'}</li>
        <li>Starts: ${data.startTime || 'N/A'}</li>
        <li>Ends: ${data.endTime || 'N/A'}</li>
        <li>Guests: ${guests}</li>
      </ul>
      ${data.confirmationLink ? `<p>Confirm here: <a href="${data.confirmationLink}">${data.confirmationLink}</a></p>` : ''}
    `;
    await this.mailer.sendMail({
      to: data.userEmail,
      subject: 'Booking Confirmation',
      html,
    });
  }

  async sendReminderEmail(data: any) {
    const html = `
      <p>Reminder: upcoming booking.</p>
      <ul>
        <li>Room: ${data.roomName || 'N/A'}</li>
        <li>Starts: ${data.startTime || 'N/A'}</li>
        <li>Ends: ${data.endTime || 'N/A'}</li>
      </ul>
    `;
    await this.mailer.sendMail({
      to: data.userEmail,
      subject: 'Meeting Reminder',
      html,
    });
  }

  async sendCheckoutEmail(data: any) {
    const html = `
      <p>Checkout reminder.</p>
      <ul>
        <li>Room: ${data.roomName || 'N/A'}</li>
        <li>Ends: ${data.endTime || 'N/A'}</li>
      </ul>
    `;
    await this.mailer.sendMail({
      to: data.userEmail,
      subject: 'Meeting Checkout Reminder',
      html,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private recentKeys = new Set<string>();

  constructor(private mailer: MailerService) {}

  private shouldSkip(key: string, ttlMs = 5 * 60 * 1000) {
    if (this.recentKeys.has(key)) {
      return true;
    }
    this.recentKeys.add(key);
    setTimeout(() => this.recentKeys.delete(key), ttlMs).unref();
    return false;
  }

  async sendConfirmationEmail(data: any) {
    const key = `confirm:${data?.bookingId}`;
    if (this.shouldSkip(key)) return;

    const to = data?.userEmail || data?.user?.email;
    if (!to) {
      console.warn('[email-service] missing recipient for confirmation', data?.bookingId);
      return;
    }

    console.log('[email-service] sendConfirmationEmail -> to:', to, 'host:', process.env.SMTP_HOST, 'port:', process.env.SMTP_PORT);
    const guests = Array.isArray(data.guests) ? data.guests.join(', ') : data.guests || 'No guests';
    const html = `
      <p>Your booking has been created${data.confirmationLink ? ' and needs confirmation' : ''}.</p>
      <ul>
        <li>Room: ${data.roomName || 'N/A'}</li>
        <li>Starts: ${data.startTime || 'N/A'}</li>
        <li>Ends: ${data.endTime || 'N/A'}</li>
        <li>Guests: ${guests}</li>
        ${data.confirmationToken ? `<li>Confirmation token: ${data.confirmationToken}</li>` : ''}
      </ul>
      ${data.confirmationLink ? `<p>Confirm here: <a href="${data.confirmationLink}">${data.confirmationLink}</a></p>` : ''}
    `;
    try {
      await this.mailer.sendMail({
        to,
        subject: 'Booking Confirmation',
        html,
      });
      console.log('[email-service] confirmation email sent to', to);
    } catch (err) {
      console.error('[email-service] confirmation email failed', err);
      throw err;
    }
  }

  async sendReminderEmail(data: any) {
    const key = `reminder:${data?.bookingId}:${data?.startTime}`;
    if (this.shouldSkip(key)) return;

    const to = data?.userEmail || data?.user?.email;
    if (!to) {
      console.warn('[email-service] missing recipient for reminder', data?.bookingId);
      return;
    }

    const html = `
      <p>Reminder: upcoming booking.</p>
      <ul>
        <li>Room: ${data.roomName || 'N/A'}</li>
        <li>Starts: ${data.startTime || 'N/A'}</li>
        <li>Ends: ${data.endTime || 'N/A'}</li>
      </ul>
    `;
    await this.mailer.sendMail({
      to,
      subject: 'Meeting Reminder',
      html,
    });
  }

  async sendCheckoutEmail(data: any) {
    const key = `checkout:${data?.bookingId}:${data?.endTime}`;
    if (this.shouldSkip(key)) return;

    const to = data?.userEmail || data?.user?.email;
    if (!to) {
      console.warn('[email-service] missing recipient for checkout reminder', data?.bookingId);
      return;
    }

    const html = `
      <p>Checkout reminder.</p>
      <ul>
        <li>Room: ${data.roomName || 'N/A'}</li>
        <li>Ends: ${data.endTime || 'N/A'}</li>
      </ul>
    `;
    await this.mailer.sendMail({
      to,
      subject: 'Meeting Checkout Reminder',
      html,
    });
  }
}

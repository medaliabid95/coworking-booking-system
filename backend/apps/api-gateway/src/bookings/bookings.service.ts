import { Injectable, HttpException } from '@nestjs/common';
import { RmqService } from '../rmq/rmq.service';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';
import { ConfirmBookingDto } from '@app/common/dtos/confirm-booking.dto';
import { UpdateBookingDto } from '@app/common/dtos/update-booking.dto';
import { lastValueFrom } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class BookingGatewayService {
  private bookingClient;

  constructor(private rmqService: RmqService) {
    this.bookingClient = this.rmqService.getClient('booking_queue');
  }

  async createBooking(dto: CreateBookingDto) {
    try {
      return await lastValueFrom(
        this.bookingClient.send('create_booking', dto).pipe(
          catchError((err) => throwError(() => this.normalizeError(err))),
        ),
      );
    } catch (err: any) {
      const { message, status } = this.normalizeError(err);
      throw new HttpException(message, status);
    }
  }

  async updateBooking(dto: UpdateBookingDto) {
    try {
      return await lastValueFrom(
        this.bookingClient.send('update_booking', dto).pipe(
          catchError((err) => throwError(() => this.normalizeError(err))),
        ),
      );
    } catch (err: any) {
      const { message, status } = this.normalizeError(err);
      throw new HttpException(message, status);
    }
  }

  async confirmBooking(dto: ConfirmBookingDto) {
    try {
      return await lastValueFrom(
        this.bookingClient.send('confirm_booking', dto).pipe(
          catchError((err) => throwError(() => this.normalizeError(err))),
        ),
      );
    } catch (err: any) {
      const { message, status } = this.normalizeError(err);
      throw new HttpException(message, status);
    }
  }

  async createOrUpdate(dto: any) {
    // If a bookingId is provided in the payload, treat this as an update
    if (dto?.bookingId) {
      return this.updateBooking(dto as UpdateBookingDto);
    }
    return this.createBooking(dto as CreateBookingDto);
  }

  private normalizeError(err: any): { message: string; status: number } {
    const rawStatus =
      err?.response?.statusCode ??
      err?.response?.status ??
      err?.status ??
      err?.statusCode;

    const statusNum = Number(rawStatus);
    const deducedStatus = Number.isInteger(statusNum)
      ? statusNum
      : this.mapStatusByMessage(
          err?.message || err?.response?.message || err?.response?.error,
        );
    const status = Number.isInteger(deducedStatus) ? deducedStatus : 500;

    const responseMsg = err?.response?.message ?? err?.response?.error;
    const rawMsg =
      (Array.isArray(responseMsg) ? responseMsg.join(', ') : responseMsg) ||
      err?.message ||
      err?.toString();

    const message =
      rawMsg ||
      (status === 403
        ? 'Booking blocked: premium membership required or outside allowed hours.'
        : status === 409
          ? 'Room is not available in the selected time range.'
          : status === 404
            ? 'Room or booking not found.'
            : status === 401
              ? 'Unauthorized: please log in.'
              : 'Booking failed. Ensure times are Mon-Fri 09:00-17:00 UTC for non-premium users and a non-premium room is selected.');

    return { message, status };
  }

  private mapStatusByMessage(message?: string) {
    if (!message) return 500;
    const msg = message.toLowerCase();
    if (msg.includes('premium')) return 403;
    if (msg.includes('business hours')) return 403;
    if (msg.includes('not available') || msg.includes('overlap')) return 409;
    if (msg.includes('not found')) return 404;
    if (msg.includes('invalid') || msg.includes('bad request')) return 400;
    if (msg.includes('unauthorized')) return 401;
    return 500;
  }
}

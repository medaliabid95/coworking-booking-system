import { Injectable } from '@nestjs/common';
import { RmqService } from '../rmq/rmq.service';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';
import { ConfirmBookingDto } from '@app/common/dtos/confirm-booking.dto';

@Injectable()
export class BookingGatewayService {
  private bookingClient;

  constructor(private rmqService: RmqService) {
    this.bookingClient = this.rmqService.getClient('booking_queue');
  }

  async createBooking(dto: CreateBookingDto) {
    return this.bookingClient.send('create_booking', dto).toPromise();
  }

  async confirmBooking(dto: ConfirmBookingDto) {
    return this.bookingClient.send('confirm_booking', dto).toPromise();
  }
}

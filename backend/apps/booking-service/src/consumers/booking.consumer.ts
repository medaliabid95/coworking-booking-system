import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookingService } from '../booking-service.service';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';
import { ConfirmBookingDto } from '@app/common/dtos/confirm-booking.dto';

@Controller()
export class BookingConsumer {
  constructor(private bookingService: BookingService) {}

  @MessagePattern('create_booking')
  createBooking(data: CreateBookingDto) {
    return this.bookingService.createBooking(data);
  }

  @MessagePattern('confirm_booking')
  confirmBooking(data: ConfirmBookingDto) {
    return this.bookingService.confirmBooking(data.bookingId);
  }
}

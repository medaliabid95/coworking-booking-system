import { Body, Controller, Post, Patch } from '@nestjs/common';
import { BookingGatewayService } from './bookings.service';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';
import { ConfirmBookingDto } from '@app/common/dtos/confirm-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingGatewayService) {}

  @Post()
  createBooking(@Body() dto: CreateBookingDto) {
    return this.bookingService.createBooking(dto);
  }

  @Patch('confirm')
  confirmBooking(@Body() dto: ConfirmBookingDto) {
    return this.bookingService.confirmBooking(dto);
  }
}

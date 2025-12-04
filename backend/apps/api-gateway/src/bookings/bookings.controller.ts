import { Body, Controller, Post, Patch, Param } from '@nestjs/common';
import { BookingGatewayService } from './bookings.service';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';
import { ConfirmBookingDto } from '@app/common/dtos/confirm-booking.dto';
import { UpdateBookingDto } from '@app/common/dtos/update-booking.dto';

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

  @Patch(':id')
  updateBooking(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.bookingService.updateBooking({ ...dto, bookingId: id });
  }
}

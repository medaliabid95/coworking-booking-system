import { Body, Controller, Post, Patch, Param, Get, Query } from '@nestjs/common';
import { BookingGatewayService } from './bookings.service';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';
import { ConfirmBookingDto } from '@app/common/dtos/confirm-booking.dto';
import { UpdateBookingDto } from '@app/common/dtos/update-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingGatewayService) {}

  @Post()
  createBooking(@Body() dto: CreateBookingDto & { bookingId?: string }) {
    // Frontend may POST for both create and update; if bookingId is present, treat as update
    return this.bookingService.createOrUpdate(dto);
  }

  @Patch('confirm')
  confirmBooking(@Body() dto: ConfirmBookingDto) {
    return this.bookingService.confirmBooking(dto);
  }

  @Patch(':id')
  updateBooking(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.bookingService.updateBooking({ ...dto, bookingId: id });
  }

  // Confirmation link handler (GET /api/bookings/confirm?bookingId=...&token=...)
  @Get('confirm')
  confirmBookingGet(@Query('bookingId') bookingId: string, @Query('token') token?: string) {
    return this.bookingService.confirmBooking({ bookingId, token });
  }
}

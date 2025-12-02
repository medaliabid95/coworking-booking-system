import { Controller, Post, Body, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.createBooking(dto);
  }

  @Post('confirm/:id')
  confirm(@Param('id') id: string) {
    return this.bookingsService.confirmBooking(Number(id));
  }
}
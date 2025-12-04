import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookingService } from '../booking-service.service';
import { CreateBookingDto } from '@app/common/dtos/create-booking.dto';
import { ConfirmBookingDto } from '@app/common/dtos/confirm-booking.dto';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';

@Controller()
export class BookingConsumer {
  constructor(private bookingService: BookingService) {}

  @MessagePattern('create_booking')
  createBooking(data: CreateBookingDto) {
    return this.bookingService.createBooking(data);
  }

  @MessagePattern('update_booking')
  updateBooking(data: any) {
    return this.bookingService.updateBooking(data);
  }

  @MessagePattern('confirm_booking')
  confirmBooking(data: ConfirmBookingDto) {
    return this.bookingService.confirmBooking(data.bookingId, data.token);
  }

  @MessagePattern('rooms_get_all')
  getRooms() {
    return this.bookingService.getRooms();
  }

  @MessagePattern('user_create')
  createUser(data: CreateUserDto) {
    return this.bookingService.createUser(data);
  }

  @MessagePattern('user_find_by_email')
  findUserByEmail(data: { email: string }) {
    return this.bookingService.findUserByEmail(data.email);
  }
}

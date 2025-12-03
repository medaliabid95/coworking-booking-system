import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BookingServiceService } from './booking-service.service';
import { User } from '../../../libs/database/src/entities/user.entity';
import { Room } from '../../../libs/database/src/entities/room.entity';
import { Booking } from '../../../libs/database/src/entities/booking.entity';

@Controller()
export class BookingServiceController {
  constructor(private readonly service: BookingServiceService) {}

  // Users
  @Post('users')
  createUser(@Body() user: Partial<User>) {
    return this.service.createUser(user);
  }

  @Get('users')
  getUsers() {
    return this.service.getUsers();
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.service.getUser(id);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() data: Partial<User>) {
    return this.service.updateUser(id, data);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }

  // Rooms
  @Post('rooms')
  createRoom(@Body() room: Partial<Room>) {
    return this.service.createRoom(room);
  }

  @Get('rooms')
  getRooms() {
    return this.service.getRooms();
  }

  @Get('rooms/:id')
  getRoom(@Param('id') id: string) {
    return this.service.getRoom(id);
  }

  @Put('rooms/:id')
  updateRoom(@Param('id') id: string, @Body() data: Partial<Room>) {
    return this.service.updateRoom(id, data);
  }

  @Delete('rooms/:id')
  deleteRoom(@Param('id') id: string) {
    return this.service.deleteRoom(id);
  }

  // Bookings
  @Post('bookings')
  createBooking(@Body() booking: Partial<Booking>) {
    return this.service.createBooking(booking);
  }

  @Get('bookings')
  getBookings() {
    return this.service.getBookings();
  }

  @Get('bookings/:id')
  getBooking(@Param('id') id: string) {
    return this.service.getBooking(id);
  }

  @Put('bookings/:id')
  updateBooking(@Param('id') id: string, @Body() data: Partial<Booking>) {
    return this.service.updateBooking(id, data);
  }

  @Delete('bookings/:id')
  deleteBooking(@Param('id') id: string) {
    return this.service.deleteBooking(id);
  }
}

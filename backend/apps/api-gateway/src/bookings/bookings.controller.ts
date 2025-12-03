import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('bookings')
export class BookingsController {
  constructor(
    @Inject('BOOKING_SERVICE') private readonly bookingClient: ClientProxy,
  ) {}

  @Post()
  async createBooking(@Body() bookingDto: any) {
    console.log('API Gateway: Creating booking', bookingDto);
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'create_booking' }, bookingDto),
    );
  }

  @Get()
  async getAllBookings() {
    console.log('API Gateway: Getting all bookings');
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'get_all_bookings' }, {}),
    );
  }

  @Get(':id')
  async getBooking(@Param('id') id: string) {
    console.log('API Gateway: Getting booking by id', id);
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'get_booking' }, { id }),
    );
  }

  @Put(':id')
  async updateBooking(@Param('id') id: string, @Body() bookingDto: any) {
    console.log('API Gateway: Updating booking', id, bookingDto);
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'update_booking' }, { id, ...bookingDto }),
    );
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: string) {
    console.log('API Gateway: Deleting booking', id);
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'delete_booking' }, { id }),
    );
  }
}

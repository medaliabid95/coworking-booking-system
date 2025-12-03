import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject('BOOKING_SERVICE') private readonly bookingClient: ClientProxy,
  ) {}

  @Post()
  async createRoom(@Body() roomDto: any) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'create_room' }, roomDto),
    );
  }

  @Get()
  async getRooms(@Query('userId') userId?: string) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'get_all_rooms' }, { userId }),
    );
  }

  @Get('available')
  async getAvailableRooms(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Query('userId') userId?: string,
  ) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'get_available_rooms' }, {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        userId,
      }),
    );
  }

  @Get(':id')
  async getRoom(@Param('id') id: string) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'get_room' }, { id }),
    );
  }

  @Put(':id')
  async updateRoom(@Param('id') id: string, @Body() roomDto: any) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'update_room' }, { id, ...roomDto }),
    );
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'delete_room' }, { id }),
    );
  }
}
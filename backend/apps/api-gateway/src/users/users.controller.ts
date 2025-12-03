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

@Controller('users')
export class UsersController {
  constructor(
    @Inject('BOOKING_SERVICE') private readonly bookingClient: ClientProxy,
  ) {}

  @Post()
  async createUser(@Body() userDto: any) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'create_user' }, userDto),
    );
  }

  @Get()
  async getUsers() {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'get_all_users' }, {}),
    );
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'get_user' }, { id }),
    );
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userDto: any) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'update_user' }, { id, ...userDto }),
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await firstValueFrom(
      this.bookingClient.send({ cmd: 'delete_user' }, { id }),
    );
  }
}
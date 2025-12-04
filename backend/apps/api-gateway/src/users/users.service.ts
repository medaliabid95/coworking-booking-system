import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('BOOKING_SERVICE') private bookingClient: ClientProxy,
  ) {}

  create(dto: CreateUserDto) {
    return this.bookingClient.send('user_create', dto);
  }

  findByEmail(email: string) {
    return this.bookingClient.send('user_find_by_email', { email });
  }
}

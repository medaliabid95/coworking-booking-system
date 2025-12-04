import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('BOOKING_SERVICE') private bookingClient: ClientProxy,
  ) {}

  async create(dto: CreateUserDto) {
    return lastValueFrom(this.bookingClient.send('user_create', dto));
  }

  async findByEmail(email: string) {
    return lastValueFrom(
      this.bookingClient.send('user_find_by_email', { email }),
    );
  }
}

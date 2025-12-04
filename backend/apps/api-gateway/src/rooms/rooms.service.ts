import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RoomsService {
  constructor(@Inject('BOOKING_SERVICE') private bookingClient: ClientProxy) {}

  getAll() {
    return this.bookingClient.send('rooms_get_all', {});
  }
}

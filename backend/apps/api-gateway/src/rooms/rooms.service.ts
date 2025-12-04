import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RoomsService {
  constructor(@Inject('BOOKING_SERVICE') private bookingClient: ClientProxy) {}

  getAll() {
    return lastValueFrom(this.bookingClient.send('rooms_get_all', {}));
  }
}

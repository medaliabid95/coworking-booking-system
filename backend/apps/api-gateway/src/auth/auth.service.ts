import { Injectable } from '@nestjs/common';
import { RmqService } from '../rmq/rmq.service';

@Injectable()
export class AuthService {
  private bookingClient;

  constructor(private rmq: RmqService) {
    this.bookingClient = this.rmq.getBookingService();
  }

  async register(dto: any) {
    return this.bookingClient.send({ cmd: 'auth_register' }, dto);
  }

  async login(dto: any) {
    return this.bookingClient.send({ cmd: 'auth_login' }, dto);
  }

  async validateToken(token: string) {
    return this.bookingClient.send({ cmd: 'auth_validate' }, { token });
  }
}

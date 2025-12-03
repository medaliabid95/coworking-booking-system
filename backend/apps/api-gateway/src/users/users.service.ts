import { Injectable } from '@nestjs/common';
import { RmqService } from '../rmq/rmq.service';

@Injectable()
export class UsersService {
  private client;

  constructor(private rmq: RmqService) {
    this.client = this.rmq.getBookingService();
  }

  async getUser(id: string) {
    return this.client.send({ cmd: 'get_user_by_id' }, { id });
  }

  async findAll() {
    return this.client.send({ cmd: 'get_users' }, {});
  }
}

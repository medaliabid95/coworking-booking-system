import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RmqService {
  constructor(private config: ConfigService) {}

  getBookingService(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.config.get('RABBITMQ_URL')],
        queue: this.config.get('BOOKING_QUEUE'),
        queueOptions: { durable: true },
      },
    });
  }
}

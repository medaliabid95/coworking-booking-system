import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

@Injectable()
export class RmqService {
  getClient(queue: string): ClientProxy {
    const rmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
      },
    });
  }
}

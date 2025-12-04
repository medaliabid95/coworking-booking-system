import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { EmailServiceModule } from './email-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const rmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue: 'email_queue',
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
}
bootstrap();

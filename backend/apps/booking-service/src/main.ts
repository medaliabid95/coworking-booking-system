// booking-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BookingServiceModule } from './booking-service.module';

async function bootstrap() {
  // Run as a pure microservice to avoid HTTP port conflicts
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'booking_queue',
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  console.log('Booking Service microservice is connected to RabbitMQ');
}
bootstrap();

// booking-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BookingServiceModule } from './booking-service.module';

async function bootstrap() {
  // Create HTTP app
  const app = await NestFactory.create(BookingServiceModule);

  // Connect to RabbitMQ as microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'booking_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  // Start all services
  await app.startAllMicroservices();
  await app.listen(3001); // Use a different port than API Gateway

  console.log(`Booking Service is running on HTTP: ${await app.getUrl()}`);
  console.log('Booking Service is connected to RabbitMQ');
}
bootstrap();

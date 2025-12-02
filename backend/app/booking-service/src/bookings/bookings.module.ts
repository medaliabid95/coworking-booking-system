import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { RoomsModule } from '../rooms/rooms.module';
import { UsersModule } from '../users/users.module';
import { EmailProducer } from '../producers/email.producer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    RoomsModule,
    UsersModule,
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'email_queue',
        },
      },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, EmailProducer],
})
export class BookingsModule {}
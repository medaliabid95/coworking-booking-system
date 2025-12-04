import { Module } from '@nestjs/common';
import { BookingController } from './bookings.controller';
import { BookingGatewayService } from './bookings.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOKING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'booking_queue',
        },
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingGatewayService],
})
export class BookingsModule {}

import { Module } from '@nestjs/common';
import { BookingController } from './bookings/bookings.controller';
import { BookingGatewayService } from './bookings/bookings.service';
import { RmqModule } from './rmq/rmq.module';

@Module({
  imports: [RmqModule],
  controllers: [BookingController],
  providers: [BookingGatewayService],
})
export class ApiGatewayModule {}

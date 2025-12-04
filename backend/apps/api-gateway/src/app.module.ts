import { Module } from '@nestjs/common';
import { BookingController } from './bookings/bookings.controller';
import { BookingGatewayService } from './bookings/bookings.service';
import { RmqModule } from './rmq/rmq.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [RmqModule, AuthModule, UsersModule, RoomsModule],
  controllers: [BookingController],
  providers: [BookingGatewayService],
})
export class ApiGatewayModule {}

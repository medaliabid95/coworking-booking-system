import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingServiceController } from './booking-service.controller';
import { BookingServiceService } from './booking-service.service';

import { DatabaseModule } from '@app/database';
import { User } from '../../../libs/database/src/entities/user.entity';
import { Room } from '../../../libs/database/src/entities/room.entity';
import { Booking } from '../../../libs/database/src/entities/booking.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User, Room, Booking])],
  controllers: [BookingServiceController],
  providers: [BookingServiceService],
})
export class BookingServiceModule {}

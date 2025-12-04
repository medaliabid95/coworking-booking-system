import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../../libs/database/src/database.module';
import { Booking } from '@app/common/entities/booking.entity';
import { User } from '@app/common/entities/user.entity';
import { Room } from '@app/common/entities/room.entity';

import { BookingService } from './booking-service.service';
import { BookingServiceController } from './booking-service.controller';
import { BookingProducer } from './producers/booking.producer';
import { BookingConsumer } from './consumers/booking.consumer';

@Module({
  imports: [
    DatabaseModule, // registers DataSource / TypeORM connection
    TypeOrmModule.forFeature([Booking, User, Room]),
  ],
  controllers: [BookingServiceController, BookingConsumer],
  providers: [BookingService, BookingProducer],
})
export class BookingServiceModule {}

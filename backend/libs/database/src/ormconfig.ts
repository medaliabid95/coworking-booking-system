import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Booking } from '../../common/src/entities/booking.entity';
import { Room } from '../../common/src/entities/room.entity';
import { User } from '../../common/src/entities/user.entity';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'admin',
  database: process.env.DB_NAME || 'coworkingdb',
  entities: [User, Room, Booking],
  synchronize: true,
  autoLoadEntities: true,
};

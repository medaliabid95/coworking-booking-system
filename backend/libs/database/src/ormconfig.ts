import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD?.toString() || 'admin',
  database: process.env.DB_NAME || 'coworking',
  autoLoadEntities: true,
  synchronize: true, // only for dev
};

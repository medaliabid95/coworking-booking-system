import { Module } from '@nestjs/common';
import { EmailService } from './email-service.service';
import { ConfigModule } from '@nestjs/config';
import { EmailServiceController } from './email-service.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [EmailServiceController],
  providers: [EmailService],
})
export class EmailServiceModule {}

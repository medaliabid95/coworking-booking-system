import { IsUUID, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  roomId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}

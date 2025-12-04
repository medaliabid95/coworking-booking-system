import { IsUUID, IsDateString, IsOptional, IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  roomId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  guests?: string[];
}

import {
  IsUUID,
  IsOptional,
  IsDateString,
  IsArray,
  IsString,
} from 'class-validator';

export class UpdateBookingDto {
  @IsUUID()
  bookingId: string;

  @IsOptional()
  @IsUUID()
  roomId?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  guests?: string[];
}

import { IsUUID, IsOptional, IsString } from 'class-validator';

export class ConfirmBookingDto {
  @IsUUID()
  bookingId: string;

  @IsOptional()
  @IsString()
  token?: string;
}

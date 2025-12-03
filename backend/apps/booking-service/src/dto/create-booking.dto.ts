export class CreateBookingDto {
  userId: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
  guests?: string[];
}

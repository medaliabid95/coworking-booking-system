export class CreateBookingDto {
  roomId: number;
  userId: number;
  startTime: string;
  endTime: string;
  guests: string[];
}
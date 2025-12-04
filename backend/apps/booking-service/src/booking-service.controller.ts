import { Controller, Get } from '@nestjs/common';
import { BookingService } from './booking-service.service';

@Controller()
export class BookingServiceController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  getHealth() {
    return { status: 'booking-service OK' };
  }
}

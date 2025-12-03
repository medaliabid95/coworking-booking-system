import { Controller, Get } from '@nestjs/common';

@Controller()
export class BookingServiceController {
  @Get('health')
  healthCheck() {
    return { status: 'Booking service OK' };
  }
}

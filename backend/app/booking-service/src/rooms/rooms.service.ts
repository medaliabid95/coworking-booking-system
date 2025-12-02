import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async checkAvailability(roomId: number, startTime: Date, endTime: Date) {
    const overlapping = await this.prisma.booking.findFirst({
      where: {
        roomId,
        OR: [
          { startTime: { lte: endTime }, endTime: { gte: startTime } },
        ],
      },
    });

    return !overlapping;
  }
}
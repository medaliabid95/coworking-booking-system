import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  validateBookingHours(user: any, start: Date) {
    if (user.premium) return true;

    const day = start.getDay();
    const hour = start.getHours();

    const isWeekend = day === 0 || day === 6;
    if (isWeekend) return false;

    const inBusinessHours = hour >= 8 && hour < 18;
    return inBusinessHours;
  }
}
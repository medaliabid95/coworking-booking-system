import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../../../libs/database/src/entities/user.entity';
import { Room } from '../../../libs/database/src/entities/room.entity';
import { Booking } from '../../../libs/database/src/entities/booking.entity';

@Injectable()
export class BookingServiceService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @Inject('EMAIL_SERVICE') private readonly emailClient: ClientProxy,
  ) {}

  // Users
  createUser(user: Partial<User>) {
    const u = this.userRepo.create(user);
    return this.userRepo.save(u);
  }

  getUsers() {
    return this.userRepo.find();
  }

  getUser(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  updateUser(id: string, data: Partial<User>) {
    return this.userRepo.update(id, data);
  }

  deleteUser(id: string) {
    return this.userRepo.delete(id);
  }

  // Rooms
  createRoom(room: Partial<Room>) {
    const r = this.roomRepo.create(room);
    return this.roomRepo.save(r);
  }

  getRooms() {
    return this.roomRepo.find();
  }

  getRoom(id: string) {
    return this.roomRepo.findOne({ where: { id } });
  }

  updateRoom(id: string, data: Partial<Room>) {
    return this.roomRepo.update(id, data);
  }

  deleteRoom(id: string) {
    return this.roomRepo.delete(id);
  }

  async createBooking(bookingDto: {
    userId: string;
    roomId: string;
    startTime: string;
    endTime: string;
  }) {
    const user = await this.userRepo.findOne({
      where: { id: bookingDto.userId },
    });
    if (!user) throw new Error('User not found');

    const room = await this.roomRepo.findOne({
      where: { id: bookingDto.roomId },
    });
    if (!room) throw new Error('Room not found');

    const startTime = new Date(bookingDto.startTime);
    const endTime = new Date(bookingDto.endTime);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      throw new Error('Invalid startTime or endTime');
    }

    const booking = this.bookingRepo.create({
      user,
      room,
      startTime,
      endTime,
      confirmed: false,
    });

    const savedBooking = await this.bookingRepo.save(booking);

    // Emit event to email service
    this.emailClient.emit('booking_created', {
      user: { email: user.email },
      room: { name: room.name },
      startTime,
      endTime,
    });

    return savedBooking;
  }

  getBookings() {
    return this.bookingRepo.find({ relations: ['user', 'room'] });
  }

  getBooking(id: string) {
    return this.bookingRepo.findOne({
      where: { id: Number(id) },
      relations: ['user', 'room'],
    });
  }

  updateBooking(id: string, data: Partial<Booking>) {
    return this.bookingRepo.update(id, data);
  }

  deleteBooking(id: string) {
    return this.bookingRepo.delete(id);
  }
}

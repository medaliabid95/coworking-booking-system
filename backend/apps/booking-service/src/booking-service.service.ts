import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../libs//database/src/entities/user.entity';
import { Room } from '../../../libs//database/src/entities/room.entity';
import { Booking } from '../../../libs//database/src/entities/booking.entity';

@Injectable()
export class BookingServiceService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
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

  // Bookings
  createBooking(booking: Partial<Booking>) {
    const b = this.bookingRepo.create(booking);
    return this.bookingRepo.save(b);
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

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { User } from '../../../libs/database/src/entities/user.entity';
import { Room } from '../../../libs/database/src/entities/room.entity';
import { Booking } from '../../../libs/database/src/entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingServiceService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  // ========== USER METHODS ==========
  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.getUser(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  // ========== ROOM METHODS ==========
  async createRoom(room: Partial<Room>): Promise<Room> {
    const newRoom = this.roomRepository.create(room);
    return await this.roomRepository.save(newRoom);
  }

  async getRooms(userId?: string): Promise<Room[]> {
    const rooms = await this.roomRepository.find();

    // Filter based on user membership if userId provided
    if (userId) {
      const user = await this.getUser(userId);
      return rooms.filter((room) => {
        // Premium users can see all rooms
        if (user.isPremium) return true;
        // Regular users can only see non-premium rooms
        return !room.premium;
      });
    }
    return rooms;
  }

  async getRoom(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);
    return room;
  }

  async updateRoom(id: string, data: Partial<Room>): Promise<Room> {
    await this.roomRepository.update(id, data);
    return this.getRoom(id);
  }

  async deleteRoom(id: string): Promise<void> {
    await this.roomRepository.delete(id);
  }

  // ========== BOOKING METHODS ==========
  async createBooking(bookingDto: CreateBookingDto): Promise<Booking> {
    const { userId, roomId, startTime, endTime } = bookingDto;
    // Validate user exists
    const user = await this.getUser(userId);
    // Validate room exists
    const room = await this.getRoom(roomId);
    // Check if user can book this room (premium restrictions)
    if (room.premium && !user.isPremium) {
      throw new ForbiddenException('Regular users cannot book premium rooms');
    }
    // Check business hours for regular users
    if (!user.isPremium) {
      const start = new Date(startTime);
      // Check if within business hours (9 AM to 6 PM, Monday to Friday)
      const day = start.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = start.getHours();

      if (day === 0 || day === 6) {
        // Weekend
        throw new ForbiddenException('Regular users can only book during business days (Monday-Friday)');
      }

      if (hour < 9 || hour > 18) { // Outside business hours
        throw new ForbiddenException('Regular users can only book between 9 AM and 6 PM');
      }
    }

    // Check room availability
    const conflictingBooking = await this.bookingRepository.findOne({
      where: {
        room: { id: roomId },
        startTime: LessThanOrEqual(new Date(endTime)),
        endTime: MoreThanOrEqual(new Date(startTime)),
        confirmed: true,
      },
    });

    if (conflictingBooking) {
      throw new BadRequestException('Room is not available for the selected time slot');
    }

    // Create booking
    const booking = this.bookingRepository.create({
      user,
      room,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      confirmed: false, // Will be confirmed via email
    });

    const savedBooking = await this.bookingRepository.save(booking);

    // Here you would emit an event to email service for confirmation
    // this.eventEmitter.emit('booking.created', { booking: savedBooking, guests });

    return savedBooking;
  }

  async getBookings(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      relations: ['user', 'room'],
    });
  }

  async getBooking(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'room'],
    });
    if (!booking)
      throw new NotFoundException(`Booking with ID ${id} not found`);
    return booking;
  }

  async updateBooking(id: string, data: Partial<Booking>): Promise<Booking> {
    await this.bookingRepository.update(id, data);
    return this.getBooking(id);
  }

  async deleteBooking(id: string): Promise<void> {
    await this.bookingRepository.delete(id);
  }

  async getAvailableRooms(
    startTime: Date,
    endTime: Date,
    userId?: string,
  ): Promise<Room[]> {
    const allRooms = await this.getRooms(userId);
    const availableRooms: Room[] = [];

    for (const room of allRooms) {
      const conflictingBooking = await this.bookingRepository.findOne({
        where: {
          room: { id: room.id },
          startTime: LessThanOrEqual(endTime),
          endTime: MoreThanOrEqual(startTime),
          confirmed: true,
        },
      });

      if (!conflictingBooking) {
        availableRooms.push(room);
      }
    }

    return availableRooms;
  }

  async confirmBooking(bookingId: string): Promise<Booking> {
    const booking = await this.getBooking(bookingId);
    booking.confirmed = true;
    return await this.bookingRepository.save(booking);
  }
}

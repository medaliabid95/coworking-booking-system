import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({ default: false })
  confirmed: boolean;
}

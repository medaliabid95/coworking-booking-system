import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';
import { randomUUID } from 'crypto';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;

  @Column({ type: 'timestamptz', nullable: true })
  startTime: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endTime: Date;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ nullable: true })
  confirmationToken?: string;

  @Column('text', { array: true, default: [] })
  guests: string[];

  constructor() {
    // auto generate a token if not set when instantiated
    if (!this.confirmationToken) {
      this.confirmationToken = randomUUID();
    }
  }
}

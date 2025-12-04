import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  capacity: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 'medium' })
  size: 'small' | 'medium' | 'large';

  @Column({ default: false })
  premium: boolean;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}

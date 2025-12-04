import 'dotenv/config';
import { Client } from 'pg';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ormconfig } from './ormconfig';
import { Room } from '../../common/src/entities/room.entity';
import { User } from '../../common/src/entities/user.entity';

async function ensureDatabase() {
  const dbName = process.env.DB_NAME || 'coworkingdb';
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin',
    database: 'postgres',
  });

  await client.connect();
  const exists = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
  if (!exists.rowCount) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Created database "${dbName}"`);
  }
  await client.end();
}

async function seed() {
  await ensureDatabase();

  const dataSource = new DataSource(ormconfig as DataSourceOptions);
  await dataSource.initialize();

  console.log('Seeding database...');

  const roomRepo = dataSource.getRepository(Room);

  const rooms: Partial<Room>[] = [
    {
      name: 'Large Room 1',
      size: 'large',
      premium: true,
      description:
        'Spacious boardroom with conferencing setup and premium amenities.',
      location: 'New York, NY',
      capacity: '12 People',
      price: '$150/hour',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
    {
      name: 'Large Room 2',
      size: 'large',
      premium: true,
      description: 'Executive suite with skyline views and AV included.',
      location: 'San Francisco, CA',
      capacity: '10 People',
      price: '$140/hour',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
    {
      name: 'Office Suit',
      size: 'medium',
      premium: true,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.',
      location: 'New York, NY',
      capacity: '8 People',
      price: '$95/month',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
    {
      name: 'Medium Room 2',
      size: 'medium',
      premium: false,
      description: 'Bright meeting room with whiteboard and TV.',
      location: 'Austin, TX',
      capacity: '6 People',
      price: '$60/hour',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
    {
      name: 'Medium Room 3',
      size: 'medium',
      premium: true,
      description: 'Premium mid-size room with video conferencing.',
      location: 'Chicago, IL',
      capacity: '6 People',
      price: '$80/hour',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
    {
      name: 'Medium Room 4',
      size: 'medium',
      premium: true,
      description: 'Sound-treated room, ideal for recordings and calls.',
      location: 'Seattle, WA',
      capacity: '5 People',
      price: '$75/hour',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
    {
      name: 'Medium Room 5',
      size: 'medium',
      premium: false,
      description: 'Flexible layout with modular tables.',
      location: 'Denver, CO',
      capacity: '6 People',
      price: '$55/hour',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
    {
      name: 'Small Room 1',
      size: 'small',
      premium: false,
      description: 'Cozy huddle room.',
      location: 'New York, NY',
      capacity: '3 People',
      price: '$25/hour',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
    {
      name: 'Small Room 2',
      size: 'small',
      premium: false,
      description: 'Phone booth style space.',
      location: 'Boston, MA',
      capacity: '2 People',
      price: '$20/hour',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
    {
      name: 'Small Room 3',
      size: 'small',
      premium: false,
      description: 'Focus pod for 1–2 people.',
      location: 'Los Angeles, CA',
      capacity: '2 People',
      price: '$18/hour',
      image:
        'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    },
  ];

  await roomRepo.save(rooms);

  console.log('Rooms seeded');

  const userRepo = dataSource.getRepository(User);
  await userRepo.save({
    email: 'admin@site.com',
    password: 'password',
    name: 'Admin',
    isPremium: true,
  });

  console.log('Admin user seeded');

  process.exit(0);
}

seed();

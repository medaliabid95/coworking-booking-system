import { DataSource } from 'typeorm';
import { ormconfig } from './ormconfig';
import { Room } from '../../common/src/entities/room.entity';
import { User } from '../../common/src/entities/user.entity';

async function seed() {
  const dataSource = new DataSource(ormconfig);
  await dataSource.initialize();

  console.log('Seeding database...');

  const roomRepo = dataSource.getRepository(Room);

  const rooms = [
    { name: 'Large Room 1', size: 'large', isPremium: true },
    { name: 'Large Room 2', size: 'large', isPremium: true },

    { name: 'Medium Room 1', size: 'medium', isPremium: false },
    { name: 'Medium Room 2', size: 'medium', isPremium: false },
    { name: 'Medium Room 3', size: 'medium', isPremium: true },
    { name: 'Medium Room 4', size: 'medium', isPremium: true },
    { name: 'Medium Room 5', size: 'medium', isPremium: false },

    { name: 'Small Room 1', size: 'small', isPremium: false },
    { name: 'Small Room 2', size: 'small', isPremium: false },
    { name: 'Small Room 3', size: 'small', isPremium: false },
  ];

  await roomRepo.save(rooms);

  console.log('Rooms seeded');

  const userRepo = dataSource.getRepository(User);
  await userRepo.save({
    email: 'admin@site.com',
    password: 'password',
    membership: 'premium',
  });

  console.log('Admin user seeded');

  process.exit(0);
}

seed();

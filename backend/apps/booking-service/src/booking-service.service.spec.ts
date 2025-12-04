import { BookingService } from './booking-service.service';
import { BookingProducer } from './producers/booking.producer';
import { Booking } from '@app/common/entities/booking.entity';
import { User } from '@app/common/entities/user.entity';
import { Room } from '@app/common/entities/room.entity';

const makeRepo = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('BookingService (unit)', () => {
  const bookingRepo = makeRepo();
  const userRepo = makeRepo();
  const roomRepo = makeRepo();
  const producer: jest.Mocked<BookingProducer> = {
    bookingCreated: jest.fn(),
    bookingConfirmed: jest.fn(),
    bookingUpdated: jest.fn(),
  } as any;

  const service = new BookingService(
    bookingRepo as any,
    userRepo as any,
    roomRepo as any,
    producer,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a booking, generates token, and emits created event', async () => {
    const user: User = { id: 'user-1', email: 'a@test.com', password: '', name: '', isPremium: true } as any;
    const room: Room = { id: 'room-1', name: 'Room', premium: true } as any;

    userRepo.findOne.mockResolvedValue(user);
    roomRepo.findOne.mockResolvedValue(room);
    bookingRepo.findOne
      .mockResolvedValueOnce(undefined) // overlap check
      .mockResolvedValueOnce({ id: 'b1', user, room, confirmationToken: 'tok-1' }); // fetch after save
    bookingRepo.create.mockImplementation((obj) => ({ ...obj }));
    bookingRepo.save.mockImplementation(async (obj) => ({ id: 'b1', ...obj }));

    const result = await service.createBooking({
      userId: user.id,
      roomId: room.id,
      startTime: new Date('2030-01-01T10:00:00Z').toISOString(),
      endTime: new Date('2030-01-01T11:00:00Z').toISOString(),
      guests: ['a@example.com'],
    });

    expect(result?.id).toBe('b1');
    expect(result?.confirmationToken).toBeDefined();
    expect(producer.bookingCreated).toHaveBeenCalledTimes(1);
    const payload = producer.bookingCreated.mock.calls[0][0] as Booking;
    expect(payload.user).toBeDefined();
    expect(payload.room).toBeDefined();
  });
});

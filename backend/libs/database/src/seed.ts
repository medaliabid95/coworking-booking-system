import { PrismaClient, RoomType, RoomStatus } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const rooms = [
    { number: "101", type: RoomType.SINGLE,  price: 60,  capacity: 1 },
    { number: "102", type: RoomType.SINGLE,  price: 65,  capacity: 1 },
    { number: "103", type: RoomType.DOUBLE,  price: 90,  capacity: 2 },
    { number: "104", type: RoomType.DOUBLE,  price: 95,  capacity: 2 },
    { number: "105", type: RoomType.SUITE,   price: 150, capacity: 3 },
    { number: "201", type: RoomType.SINGLE,  price: 70,  capacity: 1 },
    { number: "202", type: RoomType.DOUBLE,  price: 100, capacity: 2 },
    { number: "203", type: RoomType.SUITE,   price: 160, capacity: 3 },
    { number: "204", type: RoomType.DOUBLE,  price: 110, capacity: 2 },
    { number: "205", type: RoomType.SUITE,   price: 180, capacity: 4 },
  ];

  for (const room of rooms) {
    await prisma.room.create({
      data: {
        ...room,
        status: RoomStatus.AVAILABLE,
        description: "A comfortable and well-equipped room."
      },
    });
  }

  console.log("🌱 Seed complete: 10 rooms created!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

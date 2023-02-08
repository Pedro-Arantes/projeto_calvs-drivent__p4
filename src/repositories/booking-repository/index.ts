import { prisma } from "@/config";

async function findBookingById(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function updateBooking(userId: number, roomId: number, id: number) {
  return prisma.booking.update({
    where: {
      id,
    },
    data: {
      userId,
      roomId,
    },
  });
}

const bookingRepository = {
  findBookingById,
  createBooking,
  updateBooking,
};

export default bookingRepository;

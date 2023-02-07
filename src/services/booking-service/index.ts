import { notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbidden-error";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import roomRepository from "@/repositories/room-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBookingService(userId: number) {
  const booking = await bookingRepository.findBookingById(userId);
  if (!booking) {
    throw notFoundError();
  }
  return booking;
}
async function postBookingService(userId: number, roomId: number) {
  const enroll = await enrollmentRepository.findByUserId(userId);
  if (!enroll) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enroll.id);
  if (!ticket || ticket.status === "RESERVED" || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote) {
    throw forbiddenError();
  }
  const room = await roomRepository.findRoomById(roomId);
  if (!room) {
    throw notFoundError();
  }
  if (room.capacity === room.Booking.length) {
    throw forbiddenError();
  }
  const result = await bookingRepository.createBooking(userId, roomId);
  return result;
}
async function putBookingService(userId: number, roomId: number, bookingId: number) {
  const booking = await bookingRepository.findBookingById(userId);
  if (!booking) {
    throw forbiddenError();
  }
  const enroll = await enrollmentRepository.findByUserId(userId);
  if (!enroll) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enroll.id);
  if (!ticket || ticket.status === "RESERVED" || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote) {
    throw forbiddenError();
  }
  const room = await roomRepository.findRoomById(roomId);
  if (!room) {
    throw notFoundError();
  }
  if (room.capacity === room.Booking.length) {
    throw forbiddenError();
  }
  const result = await bookingRepository.updateBooking(userId, roomId, bookingId);
  return result;
}

const bookingService = {
  getBookingService,
  postBookingService,
  putBookingService,
};
export default bookingService;

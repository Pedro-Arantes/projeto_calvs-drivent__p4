import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBooking, postBooking, putBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .put("/:bookingId", putBooking)
  .get("/", getBooking)
  .post("/", postBooking);

export { bookingRouter };

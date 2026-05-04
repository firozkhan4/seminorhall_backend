import { Router } from "express";

import authRouter from "./auth.route.js";
import hallRouter from "./hall.route.js";
import bookingRouter from "./booking.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/halls", hallRouter);
router.use("/bookings", bookingRouter);

router.use((err, req, res, next) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ error: err.message || "Something went wrong" });
});

export default router;

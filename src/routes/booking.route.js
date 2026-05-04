import { Router } from "express";
import bookingModel from "../models/booking.model.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const filters = {};
  if (req.query.start) {
    filters.start_time = {
      $gte: new Date(req.query.start),
    };
  }
  if (req.query.end) {
    filters.end_time = {
      $lte: new Date(req.query.end),
    };
  }
  const booking = await bookingModel.find(filters);
  return res.status(200).json({ output: booking });
});

router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const booking = await bookingModel.findById(id);
  return res.status(200).json(booking);
});

router.post("/", authMiddleware, async (req, res) => {
  const { hall_id, title, description, start_time, end_time } = req.body;

  try {
    const booking = await bookingModel.create({
      user_id: req.user.id,
      hall_id,
      title,
      description,
      start_time,
      end_time,
    });
    return res.status(200).json({ output: booking });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.patch("/:id/status", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const booking = await bookingModel.findByIdAndUpdate(id, { status });
    return res.status(200).json({ output: booking });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;

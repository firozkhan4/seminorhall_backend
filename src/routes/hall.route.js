import { Router } from "express";
import hallModel from "../models/hall.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const halls = await hallModel.find({});
  return res.status(200).json({ output: halls });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const hall = await hallModel.findById(id);
  return res.status(200).json(hall);
});

router.post("/", async (req, res) => {
  const { name, capacity, location, description, amenities, imageUrl } =
    req.body;

  try {
    const hall = await hallModel.create({
      name,
      capacity,
      location,
      description,
      amenities,
      image_url: imageUrl,
    });

    return res.status(200).json({ output: hall });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to process request", details: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, capacity, location, description, amenities, imageUrl } =
    req.body;
  console.log(req.body);
  console.log(name, capacity, location, description, amenities, imageUrl);
  const hall = await hallModel.findByIdAndUpdate(id, {
    name,
    capacity,
    location,
    description,
    amenities,
    image_url: imageUrl,
  });
  return res.status(200).json({ output: hall });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const hall = await hallModel.findByIdAndDelete(id);
  return res.status(200).json({ output: hall });
});

export default router;

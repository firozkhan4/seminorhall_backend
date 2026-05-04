import { Router } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
const cookieOptions = {
  httpOnly: true,
  secure: config.env === "production",
  sameSite: config.env === "production" ? "none" : "lax",
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  } else {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  await userModel.create({ name, email, passwordHash, role: "user" });
  return res.status(200).json({ message: "User created successfully" });
});

router.post("/logout", authMiddleware, (req, res) => {
  res.clearCookie("token", cookieOptions);
  return res.status(200).json({ message: "Logged out successfully" });
});

router.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json(req.user);
});

export default router;

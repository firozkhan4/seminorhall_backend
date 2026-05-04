import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, config.jwtSecret);
  req.user = decoded;
  next();
};

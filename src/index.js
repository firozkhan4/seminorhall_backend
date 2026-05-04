import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import { config } from "./config/config.js";
import { connectDatabase } from "./database/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: config.origin,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

connectDatabase().then(() => {
  app.listen(config.port, () => {
    console.log("Server running on port " + config.port);
  });
});

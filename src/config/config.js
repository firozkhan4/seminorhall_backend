if (process.env.NODE_ENV !== "production") {
  await import("dotenv/config");
}

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  origin: process.env.ORIGIN.split(","),
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
};

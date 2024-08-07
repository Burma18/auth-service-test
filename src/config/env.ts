import dotenv from "dotenv";

dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  port: process.env.PORT || 3000,
  node_env: process.env.NODE_ENV || "development",
  postgres: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT),
  },
};

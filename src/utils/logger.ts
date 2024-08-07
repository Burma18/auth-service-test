import { createLogger, format, transports } from "winston";

const isDevelopment = process.env.NODE_ENV === "development";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    isDevelopment ? format.simple() : format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});

export { logger };

// IMPORTS
import winston from "winston";
import config from "../../config.js"

// INITIALIZE LOGGER
export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({
      filename: config.LOG_FILE_PATH,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new winston.transports.Console(),
  ],
});
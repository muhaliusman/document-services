import winston from "winston";
import * as fs from "fs";
import config from "../config/app";

const dir = config.logDir;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console({ colorize: true }),
    new winston.transports.File({
      dirname: dir,
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({ dirname: dir, filename: "info.log" }),
  ],
});

export default logger;

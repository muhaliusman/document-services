import dotenv from "dotenv";
import path from "path";

dotenv.config();

const config = {
  logDir: path.join(__dirname, "../../logs"),
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    expire: process.env.REDIS_EXPIRE,
    prefix: process.env.REDIS_PREFIX,
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
};

export default config;

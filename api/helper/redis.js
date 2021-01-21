import expressRedisCache from "express-redis-cache";
import config from "../config/app";
import logger from "./logger";

const cache = expressRedisCache({
  host: config.redis.host,
  port: config.redis.port,
  auth_pass: config.redis.password,
  expire: parseFloat(config.redis.expire),
  prefix: config.redis.prefix,
});

cache.delete = (names) => {
  names.forEach((v) => {
    cache.del(v, (error) => {
      if (error) {
        logger.error(error);
      }
    });
  });
};

cache.on("error", () => {
  logger.error("Konfigurasi redis salah, atau redis tidak connect");
});

export default cache;

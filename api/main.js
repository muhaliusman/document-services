import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import http from "http";
import cors from "cors";
import connect from "./config/mongoose";
import config from "./config/app";
import logger from "./helper/logger";
import router from "./router";

const app = express();
const server = http.Server(app);

app.use(cors());

app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ message: err.message });
    logger.error(err);
    return;
  }
  next();
});

server.listen(config.port, () => {
  if (
    config.env !== "production" &&
    config.env !== "development" &&
    config.env !== "testing"
  ) {
    logger.error(`Environtment tidak valid`);
    process.exit(1);
  }

  connect();
  logger.info(`listen to port: ${config.port}`);
});

import mongoose from "mongoose";
import config from "./app";
import logger from "../helper/logger";

mongoose.Promise = Promise;

if (config.env === "development") {
  mongoose.set("debug", true);
}

const connect = async () => {
  try {
    await mongoose.connect(config.mongo.uri, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
  }
};

export default connect;

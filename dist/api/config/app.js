"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

_dotenv["default"].config();

var config = {
  logDir: _path["default"].join(__dirname, "../../logs"),
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    expire: process.env.REDIS_EXPIRE,
    prefix: process.env.REDIS_PREFIX
  },
  mongo: {
    uri: process.env.MONGO_URI
  }
};
var _default = config;
exports["default"] = _default;
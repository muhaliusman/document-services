"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressRedisCache = _interopRequireDefault(require("express-redis-cache"));

var _app = _interopRequireDefault(require("../config/app"));

var _logger = _interopRequireDefault(require("./logger"));

var cache = (0, _expressRedisCache["default"])({
  host: _app["default"].redis.host,
  port: _app["default"].redis.port,
  auth_pass: _app["default"].redis.password,
  expire: parseFloat(_app["default"].redis.expire),
  prefix: _app["default"].redis.prefix
});
cache.on("error", function () {
  _logger["default"].error("Konfigurasi redis salah, atau redis tidak connect");
});
var _default = cache;
exports["default"] = _default;
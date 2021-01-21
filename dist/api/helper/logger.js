"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var fs = _interopRequireWildcard(require("fs"));

var _app = _interopRequireDefault(require("../config/app"));

var dir = _app["default"].logDir;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

var logger = _winston["default"].createLogger({
  level: "info",
  format: _winston["default"].format.combine(_winston["default"].format.timestamp(), _winston["default"].format.prettyPrint()),
  transports: [new _winston["default"].transports.Console({
    colorize: true
  }), new _winston["default"].transports.File({
    dirname: dir,
    filename: "error.log",
    level: "error"
  }), new _winston["default"].transports.File({
    dirname: dir,
    filename: "info.log"
  })]
});

var _default = logger;
exports["default"] = _default;
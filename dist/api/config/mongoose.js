"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _app = _interopRequireDefault(require("./app"));

var _logger = _interopRequireDefault(require("../helper/logger"));

_mongoose["default"].Promise = Promise;

if (_app["default"].env === "development") {
  _mongoose["default"].set("debug", true);
}

var connect = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mongoose["default"].connect(_app["default"].mongo.uri, {
              useCreateIndex: true,
              keepAlive: 1,
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false
            });

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);

            _logger["default"].error("MongoDB connection error: ".concat(_context.t0));

            process.exit(-1);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function connect() {
    return _ref.apply(this, arguments);
  };
}();

var _default = connect;
exports["default"] = _default;
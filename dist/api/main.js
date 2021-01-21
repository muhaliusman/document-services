"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _http = _interopRequireDefault(require("http"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("./config/mongoose"));

var _app = _interopRequireDefault(require("./config/app"));

var _logger = _interopRequireDefault(require("./helper/logger"));

var _router = _interopRequireDefault(require("./router"));

var app = (0, _express["default"])();

var server = _http["default"].Server(app);

app.use((0, _cors["default"])());
app.use((0, _helmet["default"])({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false
}));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use(_router["default"]);
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({
      message: err.message
    });

    _logger["default"].error(err);

    return;
  }

  next();
});
server.listen(_app["default"].port, function () {
  if (_app["default"].env !== "production" && _app["default"].env !== "development" && _app["default"].env !== "testing") {
    _logger["default"].error("Environtment tidak valid");

    process.exit(1);
  }

  (0, _mongoose["default"])();

  _logger["default"].info("listen to port: ".concat(_app["default"].port));
});
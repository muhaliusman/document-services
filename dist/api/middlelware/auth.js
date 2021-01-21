"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _app = _interopRequireDefault(require("../config/app"));

var getTokenFromHeaders = function getTokenFromHeaders(req) {
  var authorization = req.headers.authorization;

  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  }

  return null;
};

var auth = {
  required: (0, _expressJwt["default"])({
    secret: _app["default"].jwtSecret,
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"]
  })
};
module.exports = auth;
import jwt from "express-jwt";
import config from "../config/app";

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  }

  return null;
};

const auth = {
  required: jwt({
    secret: config.jwtSecret,
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
};

module.exports = auth;

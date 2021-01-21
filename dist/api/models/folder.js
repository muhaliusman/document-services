"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = _mongoose["default"].Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    "default": "folder"
  },
  is_public: {
    type: Boolean
  },
  timestamp: {
    type: Number
  },
  owner_id: {
    type: Number
  },
  share: {
    type: [String]
  },
  company_id: {
    type: Number
  }
}, {
  collection: "folders",
  minimize: false,
  versionKey: false
});

var Folder = _mongoose["default"].model("Folder", schema);

var _default = Folder;
exports["default"] = _default;
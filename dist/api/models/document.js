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
  folder_id: {
    type: String,
    "default": ""
  },
  content: {
    type: Object,
    "default": {}
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
  collection: "documents",
  minimize: false,
  versionKey: false
});

var DocumentModel = _mongoose["default"].model("Document", schema);

var _default = DocumentModel;
exports["default"] = _default;
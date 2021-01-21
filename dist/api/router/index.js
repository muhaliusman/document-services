"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _documentController = _interopRequireDefault(require("../controllers/documentController"));

var _auth = _interopRequireDefault(require("../middlelware/auth"));

var _redis = _interopRequireDefault(require("../helper/redis"));

var router = _express["default"].Router();

router.get("/document-service", [_auth["default"].required, _redis["default"].route("document-service")], _documentController["default"].getAll);
router.post("/document-service/folder", [_auth["default"].required], _documentController["default"].setFolder);
router["delete"]("/document-service/folder", [_auth["default"].required], _documentController["default"].deleteFolder);
router.get("/document-service/folder/:id", [_auth["default"].required, _redis["default"].route("document-service.folder")], _documentController["default"].getDocumentByFolderId);
router.post("/document-service/document", [_auth["default"].required], _documentController["default"].setDocument);
router.get("/document-service/document/:id", [_auth["default"].required, _redis["default"].route("document-service.document.one")], _documentController["default"].getDocumentById);
router["delete"]("/document-service/document", [_auth["default"].required], _documentController["default"].deleteDocument);
var _default = router;
exports["default"] = _default;
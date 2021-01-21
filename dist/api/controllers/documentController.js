"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _folder = _interopRequireDefault(require("../models/folder"));

var _document = _interopRequireDefault(require("../models/document"));

var _logger = _interopRequireDefault(require("../helper/logger"));

// import cache from "../helper/redis";
var documentController = {
  getAll: function () {
    var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var userId, folders, documents;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              userId = req.user.user_id;
              _context.next = 4;
              return _folder["default"].find({
                $or: [{
                  owner_id: userId
                }, {
                  is_public: true
                }, {
                  share: userId
                }]
              });

            case 4:
              folders = _context.sent;
              _context.next = 7;
              return _document["default"].find({
                $or: [{
                  owner_id: userId
                }, {
                  share: userId
                }]
              });

            case 7:
              documents = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                error: false,
                data: folders.concat(documents)
              }));

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);

              _logger["default"].error(_context.t0);

              return _context.abrupt("return", res.status(500).json({
                error: _context.t0
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }));

    function getAll(_x, _x2) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  setFolder: function () {
    var _setFolder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var id, dataToSave, folderModel, errors, data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.body.id;
              dataToSave = {
                id: id,
                name: req.body.name,
                timestamp: req.body.timestamp,
                is_public: !req.body.is_public ? true : req.body.is_public,
                owner_id: req.user.user_id,
                company_id: req.user.company_id
              };
              folderModel = new _folder["default"](dataToSave);
              errors = folderModel.validateSync();

              if (!(errors !== undefined)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(422).json(errors));

            case 7:
              _context2.next = 9;
              return _folder["default"].findOneAndUpdate({
                id: id
              }, dataToSave, {
                "new": true,
                upsert: true
              });

            case 9:
              data = _context2.sent;
              return _context2.abrupt("return", res.status(201).json({
                error: false,
                message: "folder created",
                data: data
              }));

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);

              _logger["default"].error(_context2.t0);

              return _context2.abrupt("return", res.status(500).json({
                error: _context2.t0
              }));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 13]]);
    }));

    function setFolder(_x3, _x4) {
      return _setFolder.apply(this, arguments);
    }

    return setFolder;
  }(),
  getDocumentByFolderId: function () {
    var _getDocumentByFolderId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var userId, folderId, documents;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              userId = req.user.user_id;
              folderId = req.params.id;
              _context3.next = 5;
              return _document["default"].find({
                $and: [{
                  $or: [{
                    owner_id: userId
                  }, {
                    share: userId
                  }]
                }, {
                  folder_id: folderId
                }]
              });

            case 5:
              documents = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                error: false,
                data: documents
              }));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);

              _logger["default"].error(_context3.t0);

              return _context3.abrupt("return", res.status(500).json({
                error: _context3.t0
              }));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    function getDocumentByFolderId(_x5, _x6) {
      return _getDocumentByFolderId.apply(this, arguments);
    }

    return getDocumentByFolderId;
  }(),
  deleteFolder: function () {
    var _deleteFolder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var userId, id, folder;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              userId = req.user.user_id;
              id = req.body.id;
              _context4.next = 5;
              return _folder["default"].findOneAndDelete({
                $and: [{
                  owner_id: userId
                }, {
                  id: id
                }]
              });

            case 5:
              folder = _context4.sent;

              if (folder) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                error: true,
                message: "Data not found"
              }));

            case 8:
              return _context4.abrupt("return", res.status(200).json({
                error: false,
                message: "Success delete folder"
              }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](0);

              _logger["default"].error(_context4.t0);

              return _context4.abrupt("return", res.status(500).json({
                error: _context4.t0
              }));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 11]]);
    }));

    function deleteFolder(_x7, _x8) {
      return _deleteFolder.apply(this, arguments);
    }

    return deleteFolder;
  }(),
  setDocument: function () {
    var _setDocument = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var id, dataToSave, folderModel, errors, data;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.body.id;
              dataToSave = {
                id: id,
                name: req.body.name,
                timestamp: req.body.timestamp,
                share: req.body.share,
                content: req.body.content,
                folder_id: req.body.folder_id,
                type: req.body.type,
                owner_id: req.body.owner_id ? req.body.owner_id : req.user.user_id,
                company_id: req.body.company_id ? req.body.company_id : req.user.company_id
              };
              folderModel = new _document["default"](dataToSave);
              errors = folderModel.validateSync();

              if (!(errors !== undefined)) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", res.status(422).json(errors));

            case 7:
              _context5.next = 9;
              return _document["default"].findOneAndUpdate({
                id: id
              }, dataToSave, {
                "new": true,
                upsert: true
              });

            case 9:
              data = _context5.sent;
              return _context5.abrupt("return", res.status(201).json({
                error: false,
                message: "folder created",
                data: data
              }));

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);

              _logger["default"].error(_context5.t0);

              return _context5.abrupt("return", res.status(500).json({
                error: _context5.t0
              }));

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 13]]);
    }));

    function setDocument(_x9, _x10) {
      return _setDocument.apply(this, arguments);
    }

    return setDocument;
  }(),
  getDocumentById: function () {
    var _getDocumentById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var id, userId, document;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              id = req.params.id;
              userId = req.user.user_id;
              _context6.next = 5;
              return _document["default"].findOne({
                $and: [{
                  $or: [{
                    owner_id: userId
                  }, {
                    share: userId
                  }]
                }, {
                  id: id
                }]
              });

            case 5:
              document = _context6.sent;

              if (document) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", res.status(404).json({
                error: true,
                message: "Data not found"
              }));

            case 8:
              return _context6.abrupt("return", res.status(200).json({
                error: false,
                data: document
              }));

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](0);

              _logger["default"].error(_context6.t0);

              return _context6.abrupt("return", res.status(500).json({
                error: _context6.t0
              }));

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 11]]);
    }));

    function getDocumentById(_x11, _x12) {
      return _getDocumentById.apply(this, arguments);
    }

    return getDocumentById;
  }(),
  deleteDocument: function () {
    var _deleteDocument = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var userId, id, folder;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              userId = req.user.user_id;
              id = req.body.id;
              _context7.next = 5;
              return _document["default"].findOneAndDelete({
                $and: [{
                  owner_id: userId
                }, {
                  id: id
                }]
              });

            case 5:
              folder = _context7.sent;

              if (folder) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", res.status(404).json({
                error: true,
                message: "Data not found"
              }));

            case 8:
              return _context7.abrupt("return", res.status(200).json({
                error: false,
                message: "Success delete document"
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);

              _logger["default"].error(_context7.t0);

              return _context7.abrupt("return", res.status(500).json({
                error: _context7.t0
              }));

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 11]]);
    }));

    function deleteDocument(_x13, _x14) {
      return _deleteDocument.apply(this, arguments);
    }

    return deleteDocument;
  }()
};
var _default = documentController;
exports["default"] = _default;
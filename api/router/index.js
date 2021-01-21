import express from "express";
import documentController from "../controllers/documentController";
import auth from "../middlelware/auth";
import cache from "../helper/redis";

const router = express.Router();

router.get(
  "/document-service",
  [auth.required, cache.route("document-service")],
  documentController.getAll
);
router.post(
  "/document-service/folder",
  [auth.required],
  documentController.setFolder
);
router.delete(
  "/document-service/folder",
  [auth.required],
  documentController.deleteFolder
);
router.get(
  "/document-service/folder/:id",
  [auth.required, cache.route("document-service.folder")],
  documentController.getDocumentByFolderId
);
router.post(
  "/document-service/document",
  [auth.required],
  documentController.setDocument
);
router.get(
  "/document-service/document/:id",
  [auth.required, cache.route("document-service.document.one")],
  documentController.getDocumentById
);
router.delete(
  "/document-service/document",
  [auth.required],
  documentController.deleteDocument
);

export default router;

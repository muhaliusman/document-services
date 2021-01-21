import Folder from "../models/folder";
import Document from "../models/document";
// import cache from "../helper/redis";
import logger from "../helper/logger";

const documentController = {
  getAll: async (req, res) => {
    try {
      const userId = req.user.user_id;
      const folders = await Folder.find({
        $or: [{ owner_id: userId }, { is_public: true }, { share: userId }],
      });
      const documents = await Document.find({
        $or: [{ owner_id: userId }, { share: userId }],
      });

      return res.status(200).json({
        error: false,
        data: folders.concat(documents),
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error });
    }
  },

  setFolder: async (req, res) => {
    try {
      const { id } = req.body;
      const dataToSave = {
        id,
        name: req.body.name,
        timestamp: req.body.timestamp,
        is_public: !req.body.is_public ? true : req.body.is_public,
        owner_id: req.user.user_id,
        company_id: req.user.company_id,
      };
      const folderModel = new Folder(dataToSave);
      const errors = folderModel.validateSync();

      if (errors !== undefined) {
        return res.status(422).json(errors);
      }

      const data = await Folder.findOneAndUpdate({ id }, dataToSave, {
        new: true,
        upsert: true,
      });

      // cache.del("document-service", (error) => {
      //   if (error) {
      //     logger.error(error);
      //   }
      // });

      return res.status(201).json({
        error: false,
        message: "folder created",
        data,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        error,
      });
    }
  },

  getDocumentByFolderId: async (req, res) => {
    try {
      const userId = req.user.user_id;
      const folderId = req.params.id;

      const documents = await Document.find({
        $and: [
          { $or: [{ owner_id: userId }, { share: userId }] },
          { folder_id: folderId },
        ],
      });

      return res.status(200).json({
        error: false,
        data: documents,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error });
    }
  },

  deleteFolder: async (req, res) => {
    // from readme id put in body request
    try {
      const userId = req.user.user_id;
      const { id } = req.body;

      const folder = await Folder.findOneAndDelete({
        $and: [{ owner_id: userId }, { id }],
      });

      if (!folder) {
        return res.status(404).json({
          error: true,
          message: "Data not found",
        });
      }

      // cache.del("document-service", (error) => {
      //   if (error) {
      //     logger.error(error);
      //   }
      // });

      return res.status(200).json({
        error: false,
        message: "Success delete folder",
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        error,
      });
    }
  },

  setDocument: async (req, res) => {
    try {
      const { id } = req.body;
      const dataToSave = {
        id,
        name: req.body.name,
        timestamp: req.body.timestamp,
        share: req.body.share,
        content: req.body.content,
        folder_id: req.body.folder_id,
        type: req.body.type,
        owner_id: req.body.owner_id ? req.body.owner_id : req.user.user_id,
        company_id: req.body.company_id
          ? req.body.company_id
          : req.user.company_id,
      };
      const folderModel = new Document(dataToSave);
      const errors = folderModel.validateSync();

      if (errors !== undefined) {
        return res.status(422).json(errors);
      }

      const data = await Document.findOneAndUpdate({ id }, dataToSave, {
        new: true,
        upsert: true,
      });

      // cache.del("document-service", (error) => {
      //   if (error) {
      //     logger.error(error);
      //   }
      // });

      return res.status(201).json({
        error: false,
        message: "folder created",
        data,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        error,
      });
    }
  },

  getDocumentById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.user_id;
      const document = await Document.findOne({
        $and: [{ $or: [{ owner_id: userId }, { share: userId }] }, { id }],
      });

      if (!document) {
        return res.status(404).json({
          error: true,
          message: "Data not found",
        });
      }

      return res.status(200).json({
        error: false,
        data: document,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        error,
      });
    }
  },

  deleteDocument: async (req, res) => {
    // from readme id put in body request
    try {
      const userId = req.user.user_id;
      const { id } = req.body;

      const folder = await Document.findOneAndDelete({
        $and: [{ owner_id: userId }, { id }],
      });

      if (!folder) {
        return res.status(404).json({
          error: true,
          message: "Data not found",
        });
      }

      // cache.del("document-service", (error) => {
      //   if (error) {
      //     logger.error(error);
      //   }
      // });

      return res.status(200).json({
        error: false,
        message: "Success delete document",
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        error,
      });
    }
  },
};

export default documentController;

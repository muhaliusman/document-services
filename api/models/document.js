import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "folder",
    },
    folder_id: {
      type: String,
      default: "",
    },
    content: {
      type: Object,
      default: {},
    },
    timestamp: {
      type: Number,
    },
    owner_id: {
      type: Number,
    },
    share: {
      type: [String],
    },
    company_id: {
      type: Number,
    },
  },
  { collection: "documents", minimize: false, versionKey: false }
);

const DocumentModel = mongoose.model("Document", schema);

export default DocumentModel;

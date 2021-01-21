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
    is_public: {
      type: Boolean,
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
  { collection: "folders", minimize: false, versionKey: false }
);

const Folder = mongoose.model("Folder", schema);

export default Folder;

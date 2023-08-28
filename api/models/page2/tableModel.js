const mongoose = require("mongoose");

const schema3Schema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    poste: {
      type: String,
      required: true,
    },
    heures: {
      type: [String],
      required: true,
    },
    values: {
      type: [[String]],
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Schema3Model = mongoose.model("Schema3", schema3Schema);

module.exports = Schema3Model;

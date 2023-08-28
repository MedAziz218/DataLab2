const mongoose = require("mongoose");

const schema4Schema = new mongoose.Schema(
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
const Schema4Model = mongoose.model("Schema4", schema4Schema);

module.exports = Schema4Model;

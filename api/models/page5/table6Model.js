const mongoose = require("mongoose");

const schema6Schema = new mongoose.Schema(
  {
    // date: String,
    date: {
      type: String,
      required: true,
    },
    poste: {
      type: String,
      required: true,
    },
    heures: { type: [String], required: true },
    values: { type: [[Boolean]], required: true },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Schema6Model = mongoose.model("Schema6", schema6Schema);

module.exports = Schema6Model;

const mongoose = require("mongoose");

const schema1Schema = new mongoose.Schema(
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

const Schema1Model = mongoose.model("Schema1", schema1Schema);

module.exports = Schema1Model;

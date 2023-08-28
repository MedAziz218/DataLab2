const mongoose = require("mongoose");

const schema2Schema = new mongoose.Schema(
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
      type: [[[String]]],
      required: true,
    },
  },
  { timestamps: true }
);

const Schema2Model = mongoose.model("Schema2", schema2Schema);

module.exports = Schema2Model;

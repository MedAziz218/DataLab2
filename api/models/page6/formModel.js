const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  poste: {
    type: String,
    required: true,
  },
  taille: {
    type: String,
    required: true,
  },
  ligne: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  observation: { type: String, default: "" },
  notes: { type: String, default: "" },
  user_id: {
    type: String,
    required: true,
  },
},
{ timestamps: true },
);

const formModel = mongoose.model("form", formSchema); // Use mongoose.model() here

module.exports = formModel;

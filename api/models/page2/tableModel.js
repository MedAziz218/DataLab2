const mongoose = require('mongoose');

const schema3Schema = new mongoose.Schema({
  date: String,
  poste: String,
  heures: [String],
  values: [[Boolean]],
  user_id :  {
    type : String,
    required : true
  }
},{timestamps : true});

const Schema3Model = mongoose.model('Schema3', schema3Schema);

module.exports = Schema3Model;

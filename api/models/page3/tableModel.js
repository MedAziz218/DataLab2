const mongoose = require('mongoose');

const schema4Schema = new mongoose.Schema({
  date: String,
  poste: String,
  heures: [String],
  values: [[Boolean]],
  user_id :{
    type : String, 
    required : true
  }
},{timestamps : true});

const Schema4Model = mongoose.model('Schema4', schema4Schema);

module.exports = Schema4Model;

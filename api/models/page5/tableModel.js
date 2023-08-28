const mongoose = require('mongoose');

const schema6Schema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    poste: {
        type: String,
        required: true
    },
    taille: {
        type: String,
        required: true
    },
    ligne: String,
    email: String,
    username: String,
    user_id: {
        type: String,
        required: true
    }
});

const schema6Model = mongoose.model('Schema6', schema6Schema); // Use mongoose.model() here

module.exports = schema6Model;

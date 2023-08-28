const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
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

const formModel = mongoose.model('form', formSchema); // Use mongoose.model() here

module.exports = formModel;

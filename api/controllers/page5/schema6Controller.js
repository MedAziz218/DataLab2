const express = require('express');
const router = express.Router();
const Schema6Model = require('../../models/page5/tableModel'); // Corrected model import

// GET request to retrieve all schema6 data
const getTable6 = async (req, res) => {
  const user_id = req.user._id;
  try {
    const data = await Schema6Model.find({ user_id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST request to create a new schema6 data
const addTable6 = async (req, res) => {
  const user_id = req.user._id;
  const { date, poste, taille, ligne, email, username } = req.body;

  try {
    const newData = new Schema6Model({
      date,
      poste,
      taille,
      ligne,
      email,
      username,
      user_id,
    });
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request', data: error });
  }
};

module.exports = { getTable6, addTable6 };

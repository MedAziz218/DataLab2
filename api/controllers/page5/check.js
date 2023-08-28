const express = require('express');
const router = express.Router();
const Schema6Model = require('../../models/page5/tableModel');

const check = async (req, res) => {
  const { date, poste } = req.body;

  try {
    const existingDataByDate = await Schema6Model.findOne({ date });

    if (existingDataByDate) {
      if (poste) {
        const existingDataByPoste = await Schema6Model.findOne({ poste });
        if (existingDataByPoste) {
          res.status(400).json({ error: 'Date and Poste already exist' });
        } else {
          res.status(400).json({ error: 'Date already exists' });
        }
      } else {
        res.status(400).json({ error: 'Date already exists' });
      }
    } else {
        res.status(200).json("date doesnt exist")
    }
} catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
}
module.exports = { check }
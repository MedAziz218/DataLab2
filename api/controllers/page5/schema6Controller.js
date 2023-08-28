const express = require("express");
const router = express.Router();
const Schema6Model = require("../../models/page5/table6Model"); // Replace with the correct path

// GET request to retrieve all schema6 data
const getTable6 = async (req, res) => {
  const user_id = req.user._id;
  try {
    const data = await Schema6Model.find({ user_id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST request to create a new schema6 data
const addTable6 = async (req, res) => {
  const user_id = req.user._id;
  const { date, poste, heures, values } = req.body;

  try {
    // Check if a document with the same (date, poste) combination already exists
    const existingData = await Schema6Model.findOne({ date, poste });
    if (existingData) {
      return res.status(409).json({
        error: "Data with the s1ame (date, poste) combination already exists.",
      });
    } 
    const newData = new Schema6Model({
      date,
      poste,
      heures,
      values,
      user_id,
    });
   

    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ error: "Bad Request", data: error });
  }
};

module.exports = { getTable6, addTable6 };

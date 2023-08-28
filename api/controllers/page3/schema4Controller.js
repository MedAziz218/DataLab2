const express = require("express");
const router = express.Router();
const Schema1Model = require("../../models/page3/tableModel"); // Replace with the correct path

// GET request to retrieve all schema1 data
const getTable4 = async (req, res) => {
  const user_id = req.user._id;
  try {
    const data = await Schema1Model.find({ user_id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST request to create a new schema1 data
const addTable4 = async (req, res) => {
  const user_id = req.user._id;

  const { date, poste, heures, values } = req.body;
  let observation = req.body.observation || "";
  try {
    const existingData = await Schema1Model.findOne({ date, poste });
    if (existingData) {
      return res.status(409).json({
        error: "Data with the same (date, poste) combination already exists.",
      });
    } //--------------------------------------------------------
    const newData = new Schema1Model({
      date,
      poste,
      heures,
      values,
      observation,
      user_id,
    });

    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bad Request", data: JSON.stringify(error) });
  }
};

module.exports = { getTable4, addTable4 };

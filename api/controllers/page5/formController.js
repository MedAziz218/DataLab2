const express = require("express");
const router = express.Router();
const FormModel = require("../../models/page5/formModel"); // Corrected model import
const User = require("../../models/userModel");
// GET request to retrieve all Form data
const getForm = async (req, res) => {
  const user_id = req.user._id;
  try {
    const data = await FormModel.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST request to create a new Form data
const addForm = async (req, res) => {
  const user_id = req.user._id;
  const { date, poste, taille, ligne } = req.body;
  console.log(req.user)
  try {
    const email = req.user.email;
    const username = req.user.username;

    // Check if a document with the same (date, poste) combination already exists
    const existingData = await FormModel.findOne({ date, poste });
    if (existingData) {
      return res.status(409).json({
        error: "Data with the same (date, poste) combination already exists.",
      });
    } //--------------------------------------------------------

    const newData = new FormModel({
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
    res.status(400).json({ error: "Bad Request", data: error });
  }
};

module.exports = { getForm, addForm };

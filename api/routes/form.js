const express = require("express");
const { requireAuth, requireAdminAuth } = require("../middleware/requireAuth");
const FormModel = require("../models/page6/formModel"); // Corrected model import
const Schema1Model = require("../models/page1/table1Model"); // Replace with the correct path
const Schema2Model = require("../models/page1/table2Model"); // Replace with the correct path
const Schema3Model = require("../models/page2/tableModel"); // Replace with the correct path
const Schema4Model = require("../models/page3/tableModel"); // Replace with the correct path
const Schema6Model = require("../models/page5/table6Model"); // Replace with the correct path

const router = express.Router();

const checkValidDatePoste = async (req, res) => {
  try {
    const { date, poste } = req.body;
    if (!date || !poste) {
      return res.status(400).json({
        error: "date and poste required",
      });
    }
    const existingData = await FormModel.findOne({ date, poste });
    if (existingData) {
      return res.status(409).json({
        error: "Data with the same (date, poste) combination already exists.",
      });
    } //--------------------------------------------------------
    res.status(200).json({ success: "valid date poste" });
  } catch (err) {
    return res.status(500).json({ error: "Bad Request" });
  }
};
router.post("/isvalid", requireAuth, checkValidDatePoste);

const getform = async (req, res) => {
  try {
      
      const { date, poste } = req.body;
      console.log(date, poste)
    if (!date || !poste) {
      return res.status(400).json({
        error: "date and poste required",
      });
    }
    const existingData = await FormModel.findOne({ date, poste });
    if (!existingData) {
      return res.status(404).json({
        error: "Data with the same (date, poste) do not exists.",
      });
    } //--------------------------------------------------------

    const form = {
     
      _table1: await Schema1Model.find({ date, poste }).exec(),
      _table2: await Schema2Model.find({ date, poste }).exec(),
      _table3: await Schema3Model.find({ date, poste }).exec(),
      _table4: await Schema4Model.find({ date, poste }).exec(),
      _table5: await Schema6Model.find({ date, poste }).exec(),
      _form: existingData,
    };
  
    res.status(200).json(form);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      error: err,
    });
  }
};

router.post("/getform", requireAuth, getform);
module.exports = router;

  const express = require('express');
  const router = express.Router();
  const Schema1Model = require('../../models/page1/table1Model'); // Replace with the correct path

  // GET request to retrieve all schema1 data
  const getTable1=async(req,res) => {
    const user_id= req.user._id
        try {
      const data = await Schema1Model.find({user_id});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // POST request to create a new schema1 data
  const addTable1 = async(req,res)=> {
    const user_id = req.user._id
    const { date, poste, heures, values} = req.body;

    try {
      const newData = new Schema1Model({
        date,
        poste,
        heures,
        values,
        user_id
      });
      const savedData = await newData.save();
      res.status(201).json(savedData);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request', data:error });
    }
  };

  module.exports = {getTable1,addTable1};

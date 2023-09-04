const express = require("express");
const { requireAuth, requireAdminAuth } = require("../middleware/requireAuth");
const FormModel = require("../models/page6/formModel"); // Corrected model import
const Schema2Model = require("../models/page1/table2Model"); // Replace with the correct path
const Schema3Model = require("../models/page2/tableModel"); // Replace with the correct path

const router = express.Router();

const ggg = (req, res) => {
  // const { startDate, endDate, postes } = req.body;
  const { startDate, endDate, postes } = {
    startDate: "2023-08-29",
    endDate: "2023-08-29",
    postes: ["MATIN", "SOIR", "NUIT"],
  };
};
const getDataTable2 = async (req, res) => {
  try {
    const { startDate, endDate, postes } = req.body;
    console.log(startDate, endDate);
    // Parse the startDate and endDate as Date objects.

    // Query the database to find documents matching the criteria.
    const data = await Schema2Model.find({
      date: { $gte: startDate, $lte: endDate },
      poste: {
        $in: postes,
      },
    });
  

    // Extract the values[0] and values[2] arrays from the documents.
    const result = data.map((doc) => ({
        poste:doc.poste,
        values0: doc.values[0],
        values2: doc.values[2],
      }));
    
      
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", err: error });
  }
};

router.post("/table2", getDataTable2);


const getDataTable3 = async (req, res) => {
    try {
      const { startDate, endDate, postes } = req.body;
      console.log(startDate, endDate);
      // Parse the startDate and endDate as Date objects.
  
      // Query the database to find documents matching the criteria.
      const data = await Schema3Model.find({
        date: { $gte: startDate, $lte: endDate },
        poste: {
          $in: postes,
        },
      });
    
  
      // Extract the values[0] and values[2] arrays from the documents.
      const result = data.map((doc) => ({
        poste: doc.poste,
        values: [
          // [   OS     ,     MS       ]
          [doc.values[0], doc.values[1]], 
          [doc.values[6], doc.values[7]],
          [doc.values[12], doc.values[13]], 
          [doc.values[18], doc.values[19]],
        ],
      }));
      
      res.json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error", err: error });
    }
  };
  
  router.post("/table3", getDataTable3);
  
module.exports = router;

const express = require("express");
const { requireAuth, requireAdminAuth } = require("../middleware/requireAuth");
const FormModel = require("../models/page6/formModel"); // Corrected model import
const Schema2Model = require("../models/page1/table2Model"); // Replace with the correct path
const Schema3Model = require("../models/page2/tableModel"); // Replace with the correct path

function flattenTable(table) {
  const flattened = [];
  for (let row of table) {
    for (let cell of row) {
      if (!isNaN(cell) && cell) {
        flattened.push(parseFloat(cell, 10));
      }
    }
  }
  return flattened;
}
function flattenArray(arr) {
  const flattened = [];
  for (let cell of arr) {
    if (!isNaN(cell) && cell) {
      flattened.push(parseInt(cell, 10));
    }
  }
  return flattened;
}
function customSort(a, b) {
  const dateA = a.x.substring(0, 10); // Extract the date part
  const dateB = b.x.substring(0, 10);
  const timeOrder = { MATIN: 0, SOIR: 1, NUIT: 2 };

  if (dateA === dateB) {
    return timeOrder[a.x.split(" ")[1]] - timeOrder[b.x.split(" ")[1]];
  } else {
    return dateA.localeCompare(dateB);
  }
}
function makeQuery(startDate, endDate, postes) {
  let query = {
    poste: {
      $in: postes,
    },
  };
  if (startDate) {
    query.date = {
      $gte: startDate,
    };
  }
  if (endDate) {
    if (!query.date) {
      query.date = {};
    }
    query.date.$lte = endDate;
  }
  return query;
}
function filterOddIndexes(list) {
  // Create an empty array to store the filtered elements
  const filteredList = [];

  // Iterate through the input list, starting from the second element (index 1)
  for (let i = 1; i < list.length; i += 2) {
    filteredList.push(list[i]);
  }

  return filteredList;
}
const router = express.Router();

const ggg = (req, res) => {
  // const { startDate, endDate, postes } = req.body;
  const { startDate, endDate, postes } = {
    startDate: "2023-08-29",
    endDate: "2023-08-29",
    postes: ["MATIN", "SOIR", "NUIT"],
  };
};
const getDataPoids = async (req, res) => {
  try {
    const { startDate, endDate, postes } = req.body;

    // Query the database to find documents matching the criteria.
    const data = await Schema2Model.find(makeQuery(startDate, endDate, postes));
    
    let list = [];
    for (let i = 0; i < data.length; i++) {
      const f = flattenTable(data[i].values[0].slice(1));

      for (let j = 0; j < f.length; j++) {
        list.push({ x: `${data[i].date} ${data[i].poste}`, y: f[j] });
      }
    }

    list = list.sort(customSort);
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", err: error });
  }
};

const getDataSAP = async (req, res) => {
  try {
    const { startDate, endDate, postes } = req.body;

    // Query the database to find documents matching the criteria.
    const data = await Schema2Model.find(makeQuery(startDate, endDate, postes));

    let list = [];
    for (let i = 0; i < data.length; i++) {
      const f = flattenTable(data[i].values[2].slice(1));

      for (let j = 0; j < f.length; j++) {
        list.push({ x: `${data[i].date} ${data[i].poste}`, y: f[j] });
      }
    }

    list = list.sort(customSort);
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", err: error });
  }
};

const getDataOS = async (req, res) => {
  try {
    const { startDate, endDate, postes } = req.body;

    // Query the database to find documents matching the criteria.
    const data = await Schema3Model.find(makeQuery(startDate, endDate, postes));

    let list = [];
    let i = 0;
    for (i = 0; i < data.length; i++) {
      for (const k of [0, 6, 12, 18]) {
        let values = filterOddIndexes(data[i].values[k].slice(1, 10));
        const f = flattenArray(values);

        for (let j = 0; j < f.length; j++) {
          list.push({ x: `${data[i].date} ${data[i].poste}`, y: f[j] });
        }
      }
    }

    // list = list.sort(customSort);
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", err: error });
  }
};

const getDataMS = async (req, res) => {
  try {
    const { startDate, endDate, postes } = req.body;

    // Query the database to find documents matching the criteria.
    const data = await Schema3Model.find(makeQuery(startDate, endDate, postes));

    let list = [];
    let i = 0;
    for (i = 0; i < data.length; i++) {
      for (const k of [1, 7, 13, 17]) {
        let values = filterOddIndexes(data[i].values[k].slice(1, 10));

        const f = flattenArray(values);

        for (let j = 0; j < f.length; j++) {
          list.push({ x: `${data[i].date} ${data[i].poste}`, y: f[j] });
        }
      }
    }

    // list = list.sort(customSort);
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", err: error });
  }
};

router.post("/poids", getDataPoids);
router.post("/sap", getDataSAP);
router.post("/os", getDataOS);
router.post("/ms", getDataMS);

module.exports = router;

const express = require('express');
const { getTable1,addTable1 } = require('../controllers/page1/schema1Controller'); // Replace with the correct path
const { getTable2,addTable2 } = require('../controllers/page1/schema2Controller'); // Replace with the correct path
const {requireAuth} = require('../middleware/requireAuth')
const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)
// GET request to retrieve all schema1 data
router.get('/schema1', getTable1);

// POST request to create a new schema1 data
router.post('/schema1', addTable1);


// GET request to retrieve all schema1 data
router.get('/schema2', getTable2);

// POST request to create a new schema1 data
router.post('/schema2', addTable2);
module.exports = router;

const express = require('express');
const { getTable3,addTable3 } = require('../controllers/page2/schema3Controller'); // Replace with the correct path
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)
// GET request to retrieve all schema1 data
router.get('/schema3', getTable3);

// POST request to create a new schema1 data
router.post('/schema3', addTable3);

module.exports = router
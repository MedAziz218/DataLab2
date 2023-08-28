const express = require('express');
const { getTable6,addTable6 } = require('../controllers/page5/schema6Controller'); // Replace with the correct path
const {requireAuth,requireAdminAuth} = require('../middleware/requireAuth')
const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)
// GET request to retrieve all schema1 data

//TODO: make this admin privilage (add requireAdminAuth)
router.get('/schema6', getTable6);
router.post('/schema6', addTable6);

module.exports = router
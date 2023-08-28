const express = require('express');
const { getTable6,addTable6 } = require('../controllers/page5/schema6Controller'); 
const {check} = require('../controllers/page5/check')
const {requireAuth} = require('../middleware/requireAuth')
const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)
// GET request to retrieve all schema1 data
router.get('/form', getTable6);
// TODO : add required admin auth 
// POST request to create a new schema1 data
router.post('/check' , check);
router.post('/form', addTable6);

module.exports = router
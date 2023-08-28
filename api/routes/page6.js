const express = require('express');
const { getForm,addForm } = require('../controllers/page6/formController'); // Replace with the correct path
const {requireAuth,requireAdminAuth} = require('../middleware/requireAuth')
const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)
// GET request to retrieve all schema1 data

//TODO: make this admin privilage (add requireAdminAuth)
router.get('/form', getForm);
router.post('/form', addForm);

module.exports = router
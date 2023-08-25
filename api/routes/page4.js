const express = require('express')
const multer = require('multer');
const schema5Controller = require('../controllers/page4/schema5Controller');
const {requireAuth} = require('../middleware/requireAuth')
const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)
const upload = multer({ dest: 'uploads/' }); // Destination for uploaded files

router.get('/schema5', schema5Controller.getSchema5Data);
router.post('/upload', upload.single('image'), schema5Controller.uploadImage);

module.exports = router;

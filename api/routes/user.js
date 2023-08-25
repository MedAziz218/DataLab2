const express = require('express')

// controller functions
const { loginUser, signupUser,deleteUser,updateUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)
router.delete("/:email", deleteUser);

router.put("/:email", updateUser);

module.exports = router
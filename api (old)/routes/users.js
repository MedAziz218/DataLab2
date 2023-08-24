const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//generate new password

const GetUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
router.get("/", GetUsers);

//Update an existing user
const UpdateUser = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter
  const updateData = req.body; // Assuming the updated user data is sent in the request body
  console.log(updateData,userId)
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    updateData.password = hashedPassword
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.put("/:userId", UpdateUser);

// Delete a user
const DeleteUser = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.delete("/:userId", DeleteUser);



module.exports = router;

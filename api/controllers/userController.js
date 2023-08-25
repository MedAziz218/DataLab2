require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const token = jwt.sign({ _id }, `${process.env.SECRET}`, { expiresIn: "3d" });
  return token;
};
// get all users
const GetUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res
      .status(200)
      .json({
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        token,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    // create a token
    //  const token=createToken(user._id)
    // res.status(200).json({email,token})
    res.status(200).json({ success: "User Created Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.params; // Assuming userId is passed as a URL parameter
  console.log(email);
  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { email } = req.params; // Assuming userId is passed as a URL parameter
  const updateData = req.body;
  console.log(updateData, email);
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    updateData.password = hashedPassword;
  }
  try {
    const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
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

module.exports = { signupUser, loginUser, GetUsers, deleteUser, updateUser };

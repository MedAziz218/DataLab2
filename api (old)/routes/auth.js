const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    console.log("saving")
    const user = await newUser.save();
    console.log("saved")
    res.status(200).json(user);

  } catch (err) {
    console.log("error",err)
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  // check body structure
  if (!req.body.email || !req.body.password) {
    res.status(403).json("bad_request");
    return;
  }
  try {
    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("user_not_found");
      return;
    }
    // check password validity
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("wrong_password");
      return;
    }
    //  login success
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;

// Importing modules
const express = require("express");
const router = express.Router();

// Importing User Schema
const User = require("../models/User");

// @route   POST api/user/login
// @desc    User Login API
// @access  Public
router.post("/login", (req, res) => {
  // Find user with request email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        return res.status(201).send({
          message: "User Logged In",
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
});

// @route   POST api/user/signup
// @desc    User Sign Up API
// @access  Public
router.post("/signup", (req, res, next) => {
  // Creating empty user object
  let newUser = new User();

  // Initialize newUser object with request data
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  // Call setPassword function to hash password
  newUser.setPassword(req.body.password);

  // Save newUser object to database
  newUser.save((err, User) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add user.",
      });
    } else {
      return res.status(201).send({
        message: "User added successfully",
      });
    }
  });
});

// Exporting module to allow it to be imported in other files
module.exports = router;

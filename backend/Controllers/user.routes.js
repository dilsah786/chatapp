const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config");
const userController = express.Router();
const searchController = express.Router();


searchController.get("/", async (req, res) => {
  const { search } = req.query;
  
  console.log(req.query);
  const userId = req.body.id;
  const searchedUser = await UserModel.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  })

  console.log(search);
  res.json({ data: searchedUser });
});

// Register User

userController.post("/register", async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please Enter all fields");
  }

  const userExits = await UserModel.findOne({ email: email });
  if (userExits) {
    res.json({ status: "User already exists" });
  }

  bcrypt.hash(password, 8, async function (err, hash) {
    // Store hash in your password DB.
    if (err || !hash) {
      res.json({ status: "Invalid Password" });
    } else {
      const user = await UserModel.create({
        name,
        email,
        password: hash,
        pic,
      });
      if (user) {
        res.json({
          status: "user Created Successfully",
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
          },
        });
      }
    }
  });
});

// Login User

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });

  const hashedPassword = user.password;

  bcrypt.compare(password, hashedPassword, function (err, result) {
    // result == true

    res.json({
      status: "Success",
      Message: "User logged in Successfully",
      data: {
        id:user._id,
        name: user.name,
        email: user.email,
        pic:user.pic,
        token: generateToken(user._id),
      },
    });
  });
});

module.exports = { userController,searchController };
const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const userController = express.Router();

userController.get("/", async (req, res) => {
  res.json({ status: "Success", data: "Hello Users" });
});

userController.post("/login", async (req, res) => {
    const { name, email, password, pic } = req.body;
    
    const user = await UserModel.findOne({email:email
    })
    console.log(user);
    const hashedPassword = user.password;
    console.log(hashedPassword);
    bcrypt.compare(password, hash, function(err, result) {
        // result == true
    });

  res.json({ status: "Success", data: "Hello Users" });
});

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
    if(err || !hash ){
        res.json({status:"Invalid Password"})
    }else{
    const user = await UserModel.create({
      name,
      email,
      password: hash,
      pic,
    });
    if (user) {
        res.status({ status: "user Created Successfully" });
      }
}
  }); 

  

 // res.json({ status: "Success", data: "Hello Users" });
});

module.exports = { userController };

const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretToken = process.env.secretToken

const generateToken = (id) => {
 return jwt.sign({ id }, secretToken);
 expiresIn:"30d"

};


module.exports = {generateToken}
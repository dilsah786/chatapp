const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const mongoserver = process.env.MongoUrl;

const connect = mongoose.connect(mongoserver);

module.exports = {connect}; 

const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const mongoserver = process.env.MongoUrl;
const client = new MongoClient(mongoserver);

const connect = mongoose.connect(mongoserver,{
    
    
});

module.exports = {connect}; 

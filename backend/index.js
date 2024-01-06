const express = require("express");
const { chats } = require("./data/dummy");
const { connection, connect } = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
const {
  userController,
  searchController,
} = require("./Controllers/user.routes");
const { authMiddleware } = require("./Middleware/authMiddleware");
const { ChatModel } = require("./models/chatModel");
const { chatController } = require("./Controllers/chats.routes");

const app = express();

app.use(cors());

app.use(express.json());
dotenv.config(); 

app.use("/users", userController);   // login and register

app.use(authMiddleware);       // authorization check

app.use("/users", searchController);   // get Users

app.use("/chat", chatController);     // all about chats

app.use("/*", (req, res) => {        // for incorrect url
  res.json({ status: "Failed", message: "Please Look For Correct Url" });
});

app.listen(process.env.Port || 5000, async () => {
  try {
    await connect;
    console.log("App is Conncted to mongoDB");
  } catch (error) {
    console.log(error);
  } 
  console.log("App is running on port 5000");
});

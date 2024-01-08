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
const { messageController } = require("./Controllers/message.routes");

const app = express();

app.use(cors());

app.use(express.json());
dotenv.config();

app.use("/users", userController); // login and register

app.use(authMiddleware); // authorization check

app.use("/users", searchController); // get Users

app.use("/chat", chatController); // all about chats

app.use("/messages", messageController); // all about messages

app.use("/*", (req, res) => {
  // for incorrect url
  res.json({ status: "Failed", message: "Please Look For Correct Url" });
});

const server = app.listen(process.env.Port || 5000, async () => {
  try {
    await connect;
    console.log("App is Conncted to mongoDB");
  } catch (error) {
    console.log(error);
  }
  console.log("App is running on port 5000");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room:  " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    let newChat = newMessageRecieved.chat;

    if (!newChat.users) {
      return console.log("newChats.users not defined");
    }
    newChat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) {
        return;
      }
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});

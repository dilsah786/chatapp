const express = require("express");
const { ChatModel } = require("../models/chatModel");
const { UserModel } = require("../models/userModel");

const chatController = express.Router();

// access Chats
chatController.post("/", async (req, res) => {
  const { user, userId } = req.body;

  if (!userId) {
    console.log("UserId is not sent with request");
    return res.status(400).json({ status: "error" });
  }
  var isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: user } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.lenght > 0) {
    res.json({ ischat: isChat[0] });
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [user, userId],
    };
    try {
      const createdChat = await ChatModel.create(chatData);
      const FullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");
      res.json({ status: "Chat Sent ", data: FullChat });
    } catch (error) {
      console.log(error);
    }
  }
});

// fetch Chats
chatController.get("/", async (req, res) => {});

chatController.post("/group", async (req, res) => {});

chatController.put("/groupremove", async (req, res) => {});

chatController.put("/groupadd", async (req, res) => {});

chatController.patch("/edit", async (req, res) => {});

module.exports = { chatController };

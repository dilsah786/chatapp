const express = require("express");
const { MessageModel } = require("../models/messageModel");
const { UserModel } = require("../models/userModel");
const { ChatModel } = require("../models/chatModel");

const messageController = express.Router();

messageController.post("/", async (req, res) => {
  // send message api
  const { chatId, content, userId } = req.body;

  console.log(userId);

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.json({ data: "Invalid data passed into request" });
  }

  let newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };
  try {
    let message = await MessageModel.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name email pic",
    });
    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json({ data: message });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
});

messageController.get("/:chatId", async (req,res) => {
  // Get All the messages
  const { chatId } = req.params;
 console.log(chatId);
  try {
    const message = await MessageModel.find({ chat:chatId })
      .populate("sender", "name email pic")
      .populate("chat");

      res.json({data:message})

  } catch (error) { 
    console.log(error);
  }
});
 
module.exports = { messageController };

const express = require("express");
const { ChatModel } = require("../models/chatModel");
const { UserModel } = require("../models/userModel");

const chatController = express.Router();



// fetch Chats
chatController.get("/", async (req, res) => {
  const { userId } = req.body;
  if(!userId){
    return res.json({status:"Please Login First"})
  }
  try {
    const findChatsByUserId = await ChatModel.find({
      users: { $elemMatch: { $eq: userId } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await UserModel.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).json({ data:results });
      });
  } catch (error) {
    console.log(error);
  }
});

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


chatController.post("/creategroup", async (req, res) => {
  const { users, chatName, userId } = req.body;
  if (!users || !chatName) {
    if(!users){
      return res.json({message:"Please select users"})
    }
    return res.status(400).json({ message: "Please fill all the fields" });
  }
 console.log(users);

  if (users.length < 2) {
    return res 
      .status(400)
      .json({ message: "More than 2 users are required to form a group " });
  }
   users.push(userId);

  try {
    const groupChat = await ChatModel.create({
      chatName: chatName,
      users: users,
      isGroupChat: true,
      groupAdmin: userId,
    });

    const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({ message: fullGroupChat });
  } catch (error) {
    console.log(error);
  }
});

chatController.put("/renamegroup", async (req, res) => {
  const { groupId, groupName } = req.body;

  const updatedGroup = await ChatModel.findByIdAndUpdate(
    { _id: groupId },
    { groupName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (updatedGroup) {
    return res.status(200).json({ message: updatedGroup });
  } else {
    return res.status(404).json({ message: "Group not found" });
  }
});

chatController.put("/groupadd", async (req, res) => {
  const { groupId, newUserId, userId } = req.body;


  const existUser = await ChatModel.find({
    users: { $elemMatch: { newUserId } },
  });
  console.log(existUser);
  if (existUser) {
    return res.json({ status: "User already added to group" });
  }
  const addedUser = await ChatModel.findByIdAndUpdate(
    groupId,
    {
      $push: { users: newUserId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (addedUser) {
    res.status(200).json({ message: addedUser });
  } else {
    res.status(404).json({ message: "Group not found" });
  }
});

chatController.put("/groupremove", async (req, res) => {
  const { groupId, newUserId } = req.body;

  const deletedUser = await ChatModel.findByIdAndUpdate(
    groupId,
    {
      $pull: { users: newUserId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (deletedUser) {
    res.status(200).json({ message: deletedUser });
  } else {
    res.status(404).json({ message: "Group not found" });
  }
});

chatController.patch("/edit", async (req, res) => {});

module.exports = { chatController };

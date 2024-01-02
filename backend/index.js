const express = require("express");
const { chats } = require("./data/dummy");
const {connection, connect} = require("./db");
const dotenv = require("dotenv")
const cors = require("cors");
const { userController } = require("./Controllers/user.routes");

const app = express();

app.use(cors())

app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.get("/chats", (req, res) => {
  res.send(chats);
});

app.get("/chats/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    const singleChat = chats.find((c)=>c._id === id)
    res.send(singleChat);
  });


app.use("/users",userController)



app.listen(process.env.Port || 5000, async () => {
  try {
    await connect;
    console.log("App is Conncted to mongoDB",);
  } catch (error) { 
    console.log(error);
  }
  console.log("App is running on port 5000");
});

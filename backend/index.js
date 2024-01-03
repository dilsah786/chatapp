const express = require("express");
const { chats } = require("./data/dummy");
const {connection, connect} = require("./db");
const dotenv = require("dotenv")
const cors = require("cors");
const { userController, searchController } = require("./Controllers/user.routes");
const { authMiddleware } = require("./Middleware/authMiddleware");
const { ChatModel } = require("./models/chatModel");
const { chatController } = require("./Controllers/chats.routes");

const app = express();
 
app.use(cors())
app.use(express.json());
dotenv.config();



app.use("/users",userController)



 app.use(authMiddleware)

  app.use("/users",searchController)

app.get("/", (req, res) => {
  res.json("HELLO");
});

app.use("/chat",chatController)



  app.use("/*",(req,res)=>{ 
    res.json({status:"Failed",message:"Please Look For Correct Url"})
 })

 

app.listen(process.env.Port || 5000, async () => {
  try {
    await connect;
    console.log("App is Conncted to mongoDB",);
  } catch (error) { 
    console.log(error);
  }
  console.log("App is running on port 5000");
});
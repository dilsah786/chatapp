const express = require("express");
const { chats } = require("./data/dummy");
const {connection, connect} = require("./db");
const dotenv = require("dotenv")
const cors = require("cors");
const { userController, searchController } = require("./Controllers/user.routes");
const { authMiddleware } = require("./Middleware/authMiddleware");

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

app.get("/chats", (req, res) => {
  console.log(req.body.userId);
  res.json({chats:chats,_userId:req.body.userId})
});

app.get("/chats/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    const singleChat = chats.find((c)=>c._id === id)
    res.send(singleChat);
  });

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

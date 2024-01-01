import React, { useEffect, useState } from 'react'
import axios from "axios"
import api from '../config'


const Chats = () => {
const [data,setData]  = useState([])

const getChats = async(api) =>{
      const chats  = await axios.get(`${api}/chats`)
  
    setData(chats.data);
}

console.log(data);

useEffect(()=>{
    getChats(api)
},[api])




  return (
    <div>
     {data?.map((chat)=>{
        return <div key={chat._id} > {chat.chatName} </div>
     })}
    </div>
  )
}

export default Chats
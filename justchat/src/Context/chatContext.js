import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children}) =>{
  const [user,setUser] = useState();
  const [token,setToken] = useState();
  const [selectedChat,setSelectedChat] = useState();
  const [chats,setChats] = useState([])
  const [fetchAgain,setFetchAgain] = useState(false)

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
      setUser(userInfo.data)
      setToken(userInfo.data.token)
    }
  },[])

  const logout = ()=>{
    localStorage.removeItem("userInfo");
    if(!localStorage.getItem("userInfo")){
    <Navigate to="auth"></Navigate>
    }
  }

  return <ChatContext.Provider value={{user,setUser,logout,token,setSelectedChat,selectedChat, chats,setChats,fetchAgain,setFetchAgain}} >{children}</ChatContext.Provider>
}

export  {ChatProvider,ChatContext};
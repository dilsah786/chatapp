import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children}) =>{
  const [user,setUser] = useState();

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo.data)
    if(!userInfo){
      <Navigate to="/auth"></Navigate>
    }
  },[])

  return <ChatContext.Provider value={{user,setUser}} >{children}</ChatContext.Provider>
}

export  {ChatProvider,ChatContext};
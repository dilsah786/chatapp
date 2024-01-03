import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
 
  const tokenFromLocal = JSON.parse(localStorage.getItem("userInfo"));
  let token;
  if(tokenFromLocal){
     token = tokenFromLocal.data.token
  }


  if (!token) {
    return <Navigate to="/auth"></Navigate>;
  } else{
    return children
  }
};

export default Private;

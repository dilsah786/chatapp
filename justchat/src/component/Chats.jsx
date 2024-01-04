import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../config";
import SideDrawer from "../miscellaneous/SideDrawer";
import ChatProvider, { ChatContext } from "../Context/chatContext";
import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import MyChats from "../ChatPages/MyChats";
import ChatBox from "../ChatPages/ChatBox";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(ChatContext);

  // console.log(user);

  const tokenFromLocal = JSON.parse(localStorage.getItem("userInfo"));
  let token;
  if (tokenFromLocal) {
    token = tokenFromLocal.data.token;
  }

 
  const getChats = async (token) => {
    try {
      const result = await axios.get(`${api}/chat`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  if(token){
    getChats();
  }
  console.log(chats);

  useEffect(() => {
    getChats(token);
  }, [token, api]);

  return (
    <Container>
      {user && <SideDrawer />}

      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
       
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </Container>
  );
};

export default Chats;

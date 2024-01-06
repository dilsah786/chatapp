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
  const [fetchAgain,setFetchAgain] = useState(false);
  // console.log(user);

  const tokenFromLocal = JSON.parse(localStorage.getItem("userInfo"));
  let token;
  if (tokenFromLocal) {
    token = tokenFromLocal.data.token;
  }

  return (
    <div style={{width:"100%"}} >
      {user && <SideDrawer />}

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        gap={"500px"}
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default Chats;

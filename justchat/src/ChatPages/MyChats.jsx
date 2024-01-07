import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import api from "../config";
import { AddIcon } from "@chakra-ui/icons";
import Loader from "../miscellaneous/Loader";
import GroupChatModal from "../miscellaneous/GroupChatModal";

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();

  const {
    user,
    logout,
    token,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  } = useContext(ChatContext);
  const toast = useToast();



  const fetchChats = async () => {
    try {
      const result = await fetch(`${api}/chat`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user._id),
      });
      const res = await result.json();
      setChats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSender = (loggedUser, users) => {
    if (users.length > 1) {
      return users[0]._id === loggedUser.id ? users[1].name : users[0].name;
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex", lg: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "51%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box display={"flex"}>
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28", md: "30" }}
          fontFamily={"Work sans"}
          display={"flex"}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          My Chats
          <GroupChatModal>
            <Button
              display={"flex"}
              fontSize={{ base: "17px", md: "10px", lg: "10px" }}
              rightIcon={<AddIcon />}
            >
              New Group Chat
            </Button>
          </GroupChatModal>
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflow={"hidden"}
      >
        {chats ? (
          <Stack w={"100%"} overflowY={"scroll"}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser.data, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <Loader />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

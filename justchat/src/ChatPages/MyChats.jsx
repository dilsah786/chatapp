import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import api from "../config";
import { AddIcon } from "@chakra-ui/icons";
import Loader from "../miscellaneous/Loader";
import GroupChatModal from "../miscellaneous/GroupChatModal";
import { getSender, getSenderFull } from "./important";

const MyChats = ({ fetchAgain }) => {
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

  console.log(chats);

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



  useEffect(() => {
    const loguser = (JSON.parse(localStorage.getItem("userInfo")));
    setLoggedUser(loguser.data)
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
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack w={"100%"} overflowY={"scroll"}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat?._id === chat ? "#38B2AC" : "#E8E8E8"}
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
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
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

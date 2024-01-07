import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "../miscellaneous/ProfileModal";
import ViewProfile from "./ViewProfile";
import UpdateGroupChat from "./UpdateGroupChat";
import { Form } from "react-router-dom";
import api from "../config";
import ScrollableChats from "./ScrollableChats";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessages, setNewMessages] = useState([]);
  const { user, selectedChat, setSelectedChat,token } = useContext(ChatContext);

  //   const getSender = (loggedUser,users) => {
  //     return   users[0]._id === loggedUser.id ? users[1].name : users[0].name;
  // }

  const fetchMessages = async() =>{
    if(!selectedChat){
      return;
    }
    try{
      setLoading(true);
     const result = await fetch(`${api}/messages/${selectedChat._id}`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`
      }
     })

     const res = await result.json();
     console.log(res.allMessages);
   
     setLoading(false);
     setMessages(res.allMessages)

    }catch(err){
      console.log(err);
    }

  }



  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessages) {
      try {
        
        const result = await fetch(`${api}/messages`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            content: newMessages,
          }),
        });
        const res = await result.json();
        console.log(res.data);
        setNewMessages("");
       setMessages([...messages,res.data])
      } catch (error) {
        console.log(error); 
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessages(e.target.value);
  };

  useEffect(()=>{
    fetchMessages()
  },[selectedChat])


  return (
    <>
      {selectedChat ? (
        <>
          <Text
            display={"flex"}
            flexDir={"row"}
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"Work sans"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              w={"5px"}
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon w={"4"} />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <Box display={"flex"} flexDir={"row"}>
                {selectedChat.users[0].name}
                <ViewProfile />
              </Box>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#E8E8E8"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflow={"hidden"}
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf={"center"}
                margin={"auto"}
              />
            ) : (
               <div  className="message">

                <ScrollableChats messages={messages} />
               </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessages}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box>
          <Text>Click on a user to start Chatting</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;

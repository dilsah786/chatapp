import React, { useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "../miscellaneous/ProfileModal";
import ViewProfile from "./ViewProfile";
import UpdateGroupChat from "./UpdateGroupChat";

const SingleChat = ( {fetchAgain,setFetchAgain} ) => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
  console.log(selectedChat);

//   const getSender = (loggedUser,users) => {
//     return   users[0]._id === loggedUser.id ? users[1].name : users[0].name;
// }
  

  return (
    <>
      {selectedChat ? (
        <>
          <Text display={"flex"} flexDir={"row"} 
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
              <Box display={"flex"}
              flexDir={"row"}>
                {selectedChat.users[0].name}
                <ViewProfile  />
              </Box>
            ) : (
              <>{selectedChat.chatName.toUpperCase()}
              <UpdateGroupChat  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />
              </>
            )}
          </Text>
          <Box display={"flex"}
          flexDir={"column"}
          justifyContent={"flex-end"}
          p={3}
          bg={"#E8E8E8"}
          w={"100%"}
          h={"100%"}
          borderRadius={"lg"}
          overflow={"hidden"}

           >
            
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

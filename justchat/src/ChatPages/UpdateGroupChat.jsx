import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import UserBadgeItem from "../miscellaneous/UserBadgeItem";
import UserAvatar from "./UserAvatar";
import api from "../config";

const UpdateGroupChat = ( {  fetchMessages}) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();

  const {
    selectedChat,
    setSelectedChat,
    user,
    token,
    fetchAgain,
    setFetchAgain,
  } = useContext(ChatContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(groupChatName);

  const handleRemove = async(removeUser) => {
   // setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));

   if(selectedChat.groupAdmin._id !==user._id && removeUser._id !== user._id ){
    toast({
        title:"Only admins can remove someone !",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom"
    })
    return;
   }
   try {
    setRenameLoading(true);
    const result = await fetch(`${api}/chat/removegroup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        groupId: selectedChat._id,
        newUserId: removeUser._id,
      }),
    });
    const res = await result.json();
    console.log(res);
    removeUser._id ===user._id ? setSelectedChat(): setSelectedChat(res.message);
    setFetchAgain(!fetchAgain);
    setRenameLoading(false);
    fetchMessages()
    toast({
      title: "User removed from group",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  } catch (err) {
    console.log(err);
    toast({
      title: "Error Occured",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }


  };

  const handleAddUser = async(newUser) => {
    console.log(newUser);

      if(selectedChat.users.find((u)=>u._id === newUser._id) ) {
        toast({
            title:"User Already added to Group ",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom"
        })
        return;
      }
      if(selectedChat.groupAdmin._id !==user.id){
        toast({
            title:"Only admins can add someone to Group ",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom"
        })
        return;
      }
      console.log(newUser);

      try {
        const result = await fetch(`${api}/chat/addgroup`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              groupId: selectedChat._id,
              newUserId: newUser._id,
            }),
          });
          const res = await result.json();
          console.log(res);
          setSelectedChat(res.message)
          setFetchAgain(!fetchAgain);
          setLoading(false)
      } catch (error) {
        console.log(error);

      }

  };

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }
    try {
      setRenameLoading(true);
      const result = await fetch(`${api}/chat/renamegroup`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          groupId: selectedChat._id,
          groupName: groupChatName,
        }),
      });
      const res = await result.json();
      console.log(res);
      setSelectedChat(res.message);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      toast({
        title: "Group name Updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const result = await fetch(`${api}/users?search=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await result.json();
      setSearchResult(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <div>
      <IconButton
        onClick={onOpen}
        icon={<ViewIcon />}
        display={{ base: "flex" }}
      />

<Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={loading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserAvatar
                  key={user._id}
                  user={user}
                  handleSingleChat={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
             
    </div>
  );
};

export default UpdateGroupChat;

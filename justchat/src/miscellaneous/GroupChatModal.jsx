import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { Children, useContext, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import api from "../config";
import { Form } from "react-router-dom";
import Loader from "./Loader";
import UserAvatar from "../ChatPages/UserAvatar";
import UserBadgeItem from "./UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, token, chats, setChats } = useContext(ChatContext);
  const toast = useToast();

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
    }
  };

  console.log(searchResult);

  const handleSubmit = () => {};

  const handleAddGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (user) => {};

  console.log(selectedUsers);

  return (
    <div>
      <Button onClick={onOpen}>{children}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create Group Chats
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
                width={"100%"}
                bg={"whitesmoke "}
                border={"5px"}
                borderRadius={"10"}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Dilnawaz, Tabish"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
                bg={"whitesmoke "}
              />
            </FormControl>
            {selectedUsers.map((user) => {
              return (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleSelectedUser={() => handleDelete(user)}
                />
              );
            })}
            {loading ? (
              <Loader />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserAvatar
                    key={user._id}
                    user={user}
                    handleGroup={() => handleAddGroup(user)}
                  />
                ))
            )}
            {/* render searched users */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}  onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupChatModal;
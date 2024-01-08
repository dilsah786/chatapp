import {
  BellIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import React, { useContext, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import ProfileModal from "./ProfileModal";
import api from "../config";
import Loader from "./Loader";
import UserAvatar from "../ChatPages/UserAvatar";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const {
    user,
    logout,
    token,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  } = useContext(ChatContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSearchUser = async () => {
    if (!search) {
      toast({
        title: "Please enter a search value",
        status: "warning",
        isClosable: true,
        duration: 5000,
        position: "left-top",
      });
    }
    try {
      setLoadingChat(true);
      const searchedUser = await fetch(`${api}/users?search=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await searchedUser.json();
      setSearchResult(res.data);
      setLoadingChat(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        title: "Error Occured",
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "left-top",
      });
    }
  };

 const accessChat = async (id) => {
    console.log(id);
    try {
      const userId = user.id;
      console.log(userId);

      setLoadingChat(true);
      const result = await fetch(`${api}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: id, userId: userId }),
      });

      const res = await result.json();

      console.log(res);
      if (!chats.find((c) => c._id === res._id)) setChats([...chats,res]);
      
      console.log(selectedChat);

      setSelectedChat(res.data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error);
      setLoadingChat(false);
      toast({
        title: "Error Occured",
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "left-top",
      });
    }
  };

  return (
    <>
       <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Justchat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              {/* <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              /> */}
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* Notification */}
          </Menu>
          <Menu>
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      {/* Side Drawer from left to Right */}

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearchUser}>Go</Button>
            </Box>
            {loading ? (
              <Loader />
            ) : (
              searchResult?.map((user) => (
                <UserAvatar
                  key={user._id}
                  user={user}
                  handleSingleChat={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

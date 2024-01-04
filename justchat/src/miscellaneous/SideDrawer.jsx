import {
  BellIcon,
  ChevronDownIcon,
  Search2Icon,
  SearchIcon,
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
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Toast,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { ViewIcon } from "@chakra-ui/icons";

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
  const { user, logout, token,setSelectedChat ,chats,setChats } = useContext(ChatContext);
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
      setLoading(true);
      const searchedUser = await fetch(`${api}/users?search=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await searchedUser.json();
      setSearchResult(res.data);
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

  const accessChat = async(id) =>{
    setLoadingChat(true);
     try {
      const singleUserChat = await fetch(`${api}/chat`,{
         method:"POST",
         headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
         },
         body:JSON.stringify(id)
      })
      setLoadingChat(false);
      setSelectedChat(singleUserChat);
      onClose()
     } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured",
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "left-top",
      });
     }
  }


  console.log(searchResult);
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderRadius="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button onClick={onOpen} variant="ghost">
            <SearchIcon />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Justchat
        </Text>
        <Box>
          <Menu>
            <MenuButton fontSize={"2xl"} p={1}>
              {" "}
              <BellIcon />{" "}
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton>
              <Button fontSize={"1xl"} leftIcon={<ChevronDownIcon />}>
                <Avatar
                  size={"sm"}
                  cursor={"pointer"}
                  src={user.pic}
                  name={user.name}
                />
              </Button>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* Side Drawer from laft to Right */}

      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder={"Search by name or email"}
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearchUser}>
                <Search2Icon />
              </Button>
            </Box>
            <h1>Resuls: </h1>
            {loading ? (
              <Loader />
            ) : (
              searchResult?.map((user) => {
                return <UserAvatar 
                key={user._id}
                user = {user}
                handleFunction = {()=> accessChat(user._id)}
                 /> 
              })
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

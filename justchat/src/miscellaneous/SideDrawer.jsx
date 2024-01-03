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
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import ProfileModal from "./ProfileModal";


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = useContext(ChatContext);


  console.log();
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
          <Button variant="ghost">
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
              
                <MenuList>
                <ProfileModal>
                <MenuItem>My Profile</MenuItem>
                  </ProfileModal>
                  <MenuDivider />
                  <MenuItem>Logout</MenuItem>
                </MenuList>
             
            </MenuButton>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default SideDrawer;

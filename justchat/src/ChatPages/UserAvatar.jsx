import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserAvatar = ({ user, handleSingleChat, handleGroup }) => {

  return (
    <Box
      onClick={handleSingleChat}
      
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{ bg: "#38B2AC", color: "white" }}
      w={"100%"}
      display={"flex"}
      alignItems={"center"}
      color={"blac"}
      py={2}
      px={3}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar
        mr={2}
        size={"sm"}
        cursor={"pointer"}
        name={user.name}
        src={user.pic}
      />

      <Box>
        <Text>{user.name} </Text>
        <Text fontSize={"xs"}>
          {" "}
          <b>Email : </b> {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserAvatar;

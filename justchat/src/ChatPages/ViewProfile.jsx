import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  useDisclosure,
  MenuList,
  MenuItem,
  Text,
  Image,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatContext } from "../Context/chatContext";

const ViewProfile = ({ children }) => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);


  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}> {children} </span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="md" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {selectedChat.users[1]._id === user.id
              ? selectedChat.users[0].name
              : selectedChat.users[1].name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={
                selectedChat.users[1]._id === user.id
                  ? selectedChat.users[0].pic
                  : selectedChat.users[1].pic
              }
              alt={
                selectedChat.users[1]._id === user.id
                  ? selectedChat.users[0].name
                  : selectedChat.users[1].name
              }
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email:{" "}
              {selectedChat.users[1]._id === user.id
                ? selectedChat.users[0].email
                : selectedChat.users[1].email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewProfile;

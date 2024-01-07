import React, { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatContext } from "../Context/chatContext";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChats = ({ messages }) => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    token,
    fetchAgain,
    setFetchAgain,
  } = useContext(ChatContext);
  const getSenderFull = (loggedUser, users) => {
    if (users.length > 1) {
      return users[0]._id === loggedUser.id ? users[1] : users[0];
    }
  };

   const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };

   const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };


  const isSameSender = (messages, mes, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== mes.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      (i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId) ||
      messages[messages.length - 1].sender._id
    );
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((mes, i) => {
          return (
            <div style={{ display: "flex" }} key={mes._id}>
              {(isSameSender(messages, mes, i, user.id) ||
                isLastMessage(messages, i, user.id)) && (
                <Tooltip
                  label={mes.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt={"7px"}
                    mr={1}
                    size={"sm"}
                    cursor={"pointer"}
                    name={mes.sender.name}
                    src={mes.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    mes.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginTop: "10px",
                  marginLeft: isSameSenderMargin(messages, mes, i, user.id),
                marginTop: isSameUser(messages, mes, i, user.id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {mes.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChats;

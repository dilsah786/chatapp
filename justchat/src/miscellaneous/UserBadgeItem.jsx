import { CloseIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user,handleSelectedUser}) => {

    console.log(user);

  return (
    <Box
    bg={"cyan"}
    px={2}
    py={1}
    borderRadius={"lg"}
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    color="purple"
    cursor={"pointer"}
    onClick={handleSelectedUser}
     >
    {user.name}
    <SmallCloseIcon color={"red"} />
    </Box>
  )
}

export default UserBadgeItem
import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user,handleSelectedUser}) => {

    console.log(user);

  return (
    <Box
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
    <CloseIcon pl={5} />
    </Box>
  )
}

export default UserBadgeItem
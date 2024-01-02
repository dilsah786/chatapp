import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleViewPassword = () => {
    setShow(!show);
  };

  const postPic = (pic) => {};

  const submitLoginForm = () => {};

  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          placeholder="xyz@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleViewPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="50%"
        marginTop="15px"
        onClick={submitLoginForm}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        onClick={(e) => {
          setEmail("guest@gmail.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credential
      </Button>
    </VStack>
  );
};

export default Login;

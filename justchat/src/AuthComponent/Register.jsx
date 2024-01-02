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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);

  const handleViewPassword = () => {
    setShow(!show);
  };

  const postPic = (pic) => {};

  const submitRegisterForm = () => {};

  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel> Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
      <FormControl isRequired>
        <FormLabel> Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel> Profile-Pic</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postPic(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="50%"
        marginTop="15px"
        onClick={submitRegisterForm}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;

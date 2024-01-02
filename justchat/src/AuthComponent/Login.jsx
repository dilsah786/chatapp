import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import api from "../config";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const toast = useToast();

  const handleViewPassword = () => {
    setShow(!show);
  };

  const postPic = (pic) => {};

  const submitLoginForm = async () => {

    setTimeout(()=>{
      setLoading(true);
    })
    if (!email || !password) {
      toast({
        title: "Please fill all the fields.",
        status: "warning",
        duration: 5000, 
        isClosable: true,
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return;
    }

    try {
      const result = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${api}/users/login`,
        {
          email,
          password,
        },
        result
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      //  history.push("/chats")
      <Navigate to="/chats"> </Navigate>;
      return;
    } catch (error) {
      console.log(error);
      toast({
        title: "Registration Failed ",
        description: "Please Try Again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

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

      <Navigate to="/chats"><Button
        colorScheme="blue"
        width="50%"
        marginTop="15px"
        onClick={submitLoginForm}
        isLoading={loading}
      >
        Login
      </Button></Navigate>
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

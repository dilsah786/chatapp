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
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import api from "../config";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  console.log(pic);
  const tokenFromLocal = JSON.parse(localStorage.getItem("userInfo"));
  let token;
  if(tokenFromLocal){
     token = tokenFromLocal.data.token
  }

  const handleViewPassword = () => {
    setShow(!show);
  };

  const postPic = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(()=>{
        setLoading(false)
      },1000)
      return;
    }
    console.log(pics);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "justchat");
      data.append("cloud_name", "dupcmbewe");
      fetch("https://api.cloudinary.com/v1_1/dupcmbewe/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setTimeout(()=>{
            setLoading(false)
          },1000)
        })
        .catch((err) => {
          console.log(err);
          setTimeout(()=>{
            setLoading(false)
          },1000)
        });
    } else {
      toast({
        title: "Please Select an Image.",
        description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(()=>{
        setLoading(false)
      },1000)
      return;
    }
  };

  const submitRegisterForm = async () => {
    setLoading(true);



    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(()=>{
        setLoading(false)
      },3000)
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(()=>{
        setLoading(false)
      },1000)
      return;
    }
    try {
      const  registerUser  = await axios.post(`${api}/users/register`,{
          name:name,
          email,
          password,
          pic,
        }
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(registerUser);
      localStorage.setItem("userInfo", JSON.stringify(registerUser));
      setLoading(false);
      //  history.push("/chats")
      <Navigate to="/chats"> </Navigate>;
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel> Name </FormLabel>
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
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;

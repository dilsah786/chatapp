import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Register from "./Register";
import Login from "./Login";

const MainAuth = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text textAlign="center" fontSize="2xl" fontFamily="work-sans">
          Justchat
        </Text>
      </Box>
      <Box w="100%" bg="white" p={4} borderRadius="lg" borderEndWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList marginBottom="1em">
            <Tab width={"50%"}>Register</Tab>
            <Tab width={"50%"}>Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Register />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default MainAuth;

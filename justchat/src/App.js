import { Button } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import api from "./config";
import { Box, Container, Text } from "@chakra-ui/react";
import Register from "./AuthComponent/Register";

function App() {
 
  return (
    <div className="App">
      <AllRoutes />
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
        <Text textAlign="center" fontSize="2xl" fontFamily="work-sans">Justchat</Text>
      </Box>
    </Container>
      <Register/>
    </div>
  );
}

export default App;

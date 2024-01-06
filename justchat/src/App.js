import { Button } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import api from "./config";
import { Box, Container, Text } from "@chakra-ui/react";
import Register from "./AuthComponent/Register";
import MainAuth from "./AuthComponent/MainAuth";
import Chats from "./component/Chats";
import ProfileModal from "./miscellaneous/ProfileModal";

function App() {
  return (
    <Box className="App">
     <AllRoutes/>
    </Box>
  );
}

export default App;

import { Button } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import api from "./config";
import { Box, Container, Text } from "@chakra-ui/react";
import Register from "./AuthComponent/Register";
import MainAuth from "./AuthComponent/MainAuth";
import Chats from "./component/Chats";

function App() {
  return (
    <div className="App">
    <Chats/>
      
    </div>
  );
}

export default App;

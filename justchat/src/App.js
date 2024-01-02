import { Button } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import api from "./config";
import { Box, Container, Text } from "@chakra-ui/react";
import Register from "./AuthComponent/Register";
import MainAuth from "./AuthComponent/MainAuth";

function App() {
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;

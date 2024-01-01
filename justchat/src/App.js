import { Button } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import api from "./config";

function App() {
 
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;

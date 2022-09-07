//import dependencies and libraries
import React from "react";
//import Normalize.css to reset all styles
import "./Styles/Normalize.css";
//import userProvider to wrap the app

//import app Routes
import { UserRoutes } from "./Routes/UserRoutes";
import { UserProvider } from "./UserContext/UserContext";
import { GameProvider } from "./GameContext/GameContext";

//return the component
function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  return (
    <UserProvider>
      <GameProvider>
        <UserRoutes />
      </GameProvider>
    </UserProvider>
  );
}

//export the component
export default App;

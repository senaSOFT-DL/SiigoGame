//import dependencies and libraries
import React, { Suspense } from "react";
//import Normalize.css to reset all styles
import "./Styles/Normalize.css";
//import userProvider to wrap the app

//import app Routes
import { UserRoutes } from "./Routes/UserRoutes";
import { UserProvider } from "./UserContext/UserContext";

//return the component
function App() {
  return (
    <UserProvider>
      <UserRoutes />
    </UserProvider>
  );
}

//export the component
export default App;

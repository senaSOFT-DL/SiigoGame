//import dependencies and libraries 
import React, { Suspense } from "react";
//import Normalize.css to reset all styles
import './Styles/Normalize.css';

//import app Routes 
import { UserRoutes } from "./Routes/UserRoutes";

//return the component
function App() {
  return (
    <UserRoutes />
  );
}

//export the component
export default App;

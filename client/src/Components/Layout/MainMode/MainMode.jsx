//import dependecies and reactHooks, styleSheet and components;
import React from "react";
import "./MainMode.scss";
import { CreateRoom } from "../CreateRoom/CreateRoom";
import { JoinRoom } from "../JoinRoom/JoinRoom";


export const MainMode = () => {
  return (
    <div className="mainMode-select">
      <CreateRoom />
      <JoinRoom />
    </div>
  );
};

import React from "react";
import GameContext from "../../../GameContext/GameContext";
//import sockets
import socket from "../../../WebSockets/WebSockets";
import { PokeCard } from "../../UI/PokeCard/PokeCard";

//export comparing cards component
export const ComparingCards = () => {
  const { type } = React.useContext(GameContext);

  React.useEffect(() => {}, [type]);



  //state to save the cards

  //send the user to socket
  return (
    <div>
      
    </div>
  );
};

import React from "react";
import GameContext from "../../../GameContext/GameContext";
//import sockets
import socket from "../../../WebSockets/WebSockets";
import { PokeCard } from "../../UI/PokeCard/PokeCard";

//export comparing cards component
export const ComparingCards = () => {

  const { type }  = React.useContext(GameContext);


  React.useEffect(() => {
  }, [type]);
  
  //state to save the cards
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    //received the comparing cards to socket
    socket.on("comparingCards", (data) => {
      console.log(data);
      return setCards((item) => [...item, data]);
    });
  }, [socket]);

    //send the user to socket
  return (
    <div>
     
      
    </div>
  );
};

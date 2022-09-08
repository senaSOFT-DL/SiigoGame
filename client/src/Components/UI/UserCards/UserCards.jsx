//import stylesheet
import "./UserCards.scss";
//import socket
import socket from "../../../WebSockets/WebSockets";

//export a component
import React from "react";
import { PokeCard } from "../PokeCard/PokeCard";

export const UserCards = () => {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    //received the user cards to socket
  }, [socket]);

  const selectCategory = (category, room) => {
    //construct the object to send to socket
    let data = {
      category: category,
      room: room,
    };
    //send the category to play round
    socket.emit("category", (data, response) => {
      console.log(response);
    });
  };
  

  return (
    <div className="user-cards">
      <PokeCard url={"https://pokeapi.co/api/v2/pokemon/1"} />
    </div>
  );
};

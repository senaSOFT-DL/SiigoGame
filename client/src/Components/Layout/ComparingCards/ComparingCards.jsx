import React from "react";
//import sockets
import socket from "../../../WebSockets/WebSockets";
import { PokeCard } from "../../UI/PokeCard/PokeCard";

//export comparing cards component
export const ComparingCards = () => {
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    //received the comparing cards to socket
    socket.on("comparingCards", (data) => {
      console.log(data);
      return setCards((item) => [...item, data]);
    });
  }, [socket]);

  return (
    <div>
      {
        //render the comparing cards
        cards.map((item) => {
          return (
            <PokeCard
              key={item.id}
              name={item.name}
              image={item.image}
              hp={item.hp}
              attack={item.attack}
              defense={item.defense}
              speed={item.speed}
            />
          );
        })
      }
    </div>
  );
};

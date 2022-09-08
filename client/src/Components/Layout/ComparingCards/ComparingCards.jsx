import React from "react";
import GameContext from "../../../GameContext/GameContext";
import './ComparingCards.scss';
//import sockets

//export comparing cards component
export const ComparingCards = () => {
  const { type } = React.useContext(GameContext);

  React.useEffect(() => {}, [type]);



  //state to save the cards

  //send the user to socket
  return (
    <div className="comparing-cards-content">
      
    </div>
  );
};

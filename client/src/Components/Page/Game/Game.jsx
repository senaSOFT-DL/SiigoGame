import React from "react";
//import react Helmet
import { Helmet } from "react-helmet";
import GameContext from "../../../GameContext/GameContext";
import { CountDown } from "../../UI/CountDown/CountDown";
import { useNavigate } from "react-router-dom";
//import stylesheet
import "./Game.scss";
import { UserCards } from "../../UI/UserCards/UserCards";
import { PlayersCount } from "../../UI/PlayersCount/PlayersCount";
import socket from "../../../WebSockets/WebSockets";
import { Type } from "../../UI/Type/Type";
import { ComparingCards } from "../../Layout/ComparingCards/ComparingCards";
//import timer ;
export default function Game() {
  const { game, clearData, type } = React.useContext(GameContext);

  //set owner turn
  const [ownerTurn, setOwnerTurn] = React.useState(true);


  React.useEffect(() => {
    //validate owner turn
    socket.on("turn", (data) => {
      if (data.id === socket.id) {
        return setOwnerTurn(true);
      }
    });
  }, [socket]);

  //create a navigate function to redirect to the home page
  const navigate = useNavigate();
  //create a timer
  React.useEffect(() => {
    if (game.timestamp === "complete") {
      alert("juego terminado");
      clearData();
      navigate("/");
    }
  }, [game]);

  return (
    <div className="game-container">
      <Helmet>
        <title>Siigo Match Game</title>
      </Helmet>
      <CountDown />
      <div className="game-table">
        <div className="game-table-user">
          <div className="title-container">
            <h2 className="title">Players</h2>
          </div>
          <PlayersCount />
        </div>
        <div className="game-table-cards">
          {ownerTurn && <Type />}
          <ComparingCards />
        </div>
      </div>
      <UserCards />
    </div>
  );
}

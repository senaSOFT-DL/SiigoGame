import React from "react";
import GameContext from "../../../GameContext/GameContext";
import { CountDown } from "../../UI/CountDown/CountDown";
import { useNavigate } from "react-router-dom";
import { PokeCard } from "../../UI/PokeCard/PokeCard";
//import stylesheet
import "./Game.scss";
//import timer ;
export default function Game() {
  const { game, clearData } = React.useContext(GameContext);

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
    <div>
      <CountDown />
      <PokeCard />
    </div>
  );
}

import React from "react";
//import socket for conect to server
import socket from "../../../WebSockets/WebSockets";
//import loading animated component
import { Loading } from "./Loading";
//import stylesheet
import "./AwaitRoom.scss";
import UserContext from "../../../UserContext/UserContext";

export const AwaitRoom = ({ roomId , role }) => {
  //state for count the players in the room
  const [players, setPlayers] = React.useState(0);

  //use the user context
  const { user } = React.useContext(UserContext);

  React.useEffect(()=> {
    console.log(user);
  },[user])

  //effect for count in real time the players in the room
  React.useEffect(() => {
    socket.emit("users:count", roomId, (response) => {
      //validate players
      response.status > 1 ? setPlayers(response.status) : setPlayers(1);
    });
  }, [socket]);

  return (
    <div className="await-overlay">
      {role === "owner" ? (
        <div className="awaitroom-content">
          {
            //conditional render for show the players in the room
            players === 1 ? (
              <h2>Esperando jugadores...</h2>
            ) : (
              <h2>Jugadores en sala... {players}</h2>
              
            )
          }
          <h2>{user.room}</h2>
          <Loading />
          {
            //conditional render for show the button to start the game
            players >= 2 ? <button>Empezar partida</button> : null
          }
        </div>
      ) : (
        <div className="awaitroom-content">
          {
            //conditional render for show the players in the room
            players === 1 ? (
              <h2>Esperando jugadores...</h2>
            ) : (
              <h2>Jugadores en sala... {players}</h2>
            )
          }
          {
            //conditional render for await the owner to start the game
          }
          <Loading />
          <h2>Esperando al lider para empezar la partida</h2>
        </div>
      )}
    </div>
  );
};

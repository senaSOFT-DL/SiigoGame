import React, { useEffect } from "react";
//import socket for conect to server
import socket from "../../../WebSockets/WebSockets";
//import loading animated component
import { Loading } from "./Loading";
//import stylesheet
import "./AwaitRoom.scss";
import UserContext from "../../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import RoomContext from "../../../roomContext/RoomContext";

export const AwaitRoom = ({ role, roomId }) => {
  //navigate to game room
  const navigate = useNavigate();
  //state for count the players in the room
  const [players, setPlayers] = React.useState(2);

  //use the user context
  const { user } = React.useContext(UserContext);
  const { room } = React.useContext(RoomContext);

  //update in real time the players in the room
  React.useEffect(() => {}, [user, room]);

  //effect for count in real time the players in the room
  React.useEffect(() => {
    socket.on("players", (data, response) => {
      socket.emit("users:count", room, (response) => {
        //validate players
      });
    });
  }, [socket]);

  //function to validate users and navigate to the game room
  const sendToGame = () => {
    socket.emit("ready", user.room, (response) => {
      if (response.code === 200) {
        navigate("/game");
      }
    });
  };

  //function to validate players
  useEffect(() => {
    socket.on("start", (data) => {
      console.log(data);
      // if (data.msg === "started game") {
      //   navigate("/game");
      // }
    });
  }, [socket]);

  return (
    <div className="await-overlay">
      {role === "owner" && (
        <div className="awaitroom-content">
          {
            //conditional render for show the players in the room
            players === 1 ? (
              <h2>Esperando jugadores...</h2>
            ) : (
              <h2>Jugadores en sala: {players}</h2>
            )
          }
          <div className="code-room">
            <h2>Room code</h2>
            <h2 title="code">{user.room}</h2>
          </div>

          <Loading />
          {
            //conditional render for show the button to start the game
            players >= 2 ? (
              <button onClick={sendToGame}>Empezar partida</button>
            ) : null
          }
        </div>
      )}
      {role === "player" && (
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
          <div className="status-container">
            <h2 className="status">Esperando al lider para empezar la partida</h2>
          </div>
        </div>
      )}
    </div>
  );
};

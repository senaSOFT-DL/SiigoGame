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
  
  React.useEffect(() => {
    console.log(user);
    console.log(room);
  }, [user ,room]);

  //effect for count in real time the players in the room
  React.useEffect(() => {
    console.log(room);  
    socket.on("players", (data, response) => {
      socket.emit("users:count", room, (response) => {
        //validate players
        console.log(response);
      });
    });
  }, [socket]);

  const sendToGame = () => {
    socket.emit('ready',( user.room , (response) => {
      console.log(response);
    }))
  };

  useEffect(() => {
    socket.on("start", (data) => {
      console.log(data);
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
              <h2>Jugadores en sala... {players}</h2>
            )
          }
          <h2>{user.room}</h2>
          <Loading />
          {
            //conditional render for show the button to start the game
            players >= 2 ? (
              <button onClick={ sendToGame}>Empezar partida</button>
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
          <h2>Esperando al lider para empezar la partida</h2>
        </div>
      )}
    </div>
  );
};

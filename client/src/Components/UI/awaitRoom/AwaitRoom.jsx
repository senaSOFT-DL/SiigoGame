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

export const AwaitRoom = ({ role }) => {
  //navigate to game room
  const navigate = useNavigate();
  //state for count the players in the room
  const [players, setPlayers] = React.useState(2);

  //use the user context
  const { user } = React.useContext(UserContext);
  const { room } = React.useContext(RoomContext);
  const [loading, setLoading] = React.useState(false);

  //update in real time the players in the room
  React.useEffect(() => {}, [user, room , loading]);

  //effect for count in real time the players in the room
  React.useEffect(() => {
    socket.emit("users:count", room.room, (response) => {
      //validate players
      return setPlayers(response.Users);
    });
  }, [socket]);

  //function to validate users and navigate to the game room
  const sendToGame = () => {
    setLoading(true);
    socket.emit("ready", user.room, (response) => {
      if (response.code === 200) {    
        navigate("/game");
      }
    });
  };

  //function to validate players
  useEffect(() => {
    socket.on("start", (data) => {
      if (data.msg === "started game") {
        navigate("/game");
      }
    });
  }, [socket]);

  //validate enter key to send to game
  const validateKey = (event) => {
    let charCode = event.keyCode;
    if (charCode === 13) {
      sendToGame();
    }
  };

  return (
    <div className="await-overlay">
      {role === "owner" && (
        <div className="awaitroom-content">
          {
            //conditional render for show the players in the room
            players === 1 && 
              <h2>Waiting players...</h2>
            
          }
          <div className="code-room">
            <h2>Room code</h2>
            <h2 title="code">{user.room}</h2>
          </div>

          <Loading />
          {loading && <h2>game is loading please wait...</h2>}
          <button onClick={sendToGame} onKeyUp={event => validateKey(event)}>Start game</button>
        </div>
      )}
      {role === "player" && (
        <div className="awaitroom-content">
          {
            //conditional render for show the players in the room
            players === 1 ? (
              <h2>Waiting Players...</h2>
            ) : (
              <h2>Players in room... {players}</h2>
            )
          }
          {
            //conditional render for await the owner to start the game
          }
          <Loading />
          <div className="status-container">
            {loading &&
            <h2>game is loading please wait</h2>
            }
            <h2 className="status">waiting for the owner to start the game</h2>
          </div>
        </div>
      )}
    </div>
  );
};

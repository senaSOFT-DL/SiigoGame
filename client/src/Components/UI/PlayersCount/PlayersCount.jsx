//import react and other dependencies
import React from "react";
//import the context
import RoomContext from "../../../roomContext/RoomContext";
//import socket
import socket from "../../../WebSockets/WebSockets";
//import stylesheet
import "./PlayersCount.scss";
import { CgPokemon } from "react-icons/cg";

export const PlayersCount = () => {
  //extract room from room context
  const { room } = React.useContext(RoomContext);
  const [players, setPlayers] = React.useState(0);

  React.useEffect(() => {
    socket.emit("users:count", room.room, (response) => {
      return setPlayers(response.Users);
    });
  }, [room, socket]);

  return (
    <div className="count-players">
      {players === 2 && (
        <div className="users-content">
          <div className="user">
            <CgPokemon className="icon-count" />
          </div>
          <div className="user">
            <CgPokemon className="icon-count" />
          </div>
        </div>
      )}
      {players === 3 && (
        <div className="users-content">
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
        </div>
      )}
      {players === 4 && (
        <div className="users-content">
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
        </div>
      )}
      {players === 5 && (
        <div className="users-content">
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
        </div>
      )}
      {players === 6 && (
        <div className="users-content">
          <div className="user">
            <CgPokemon className="icon-count" />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"   />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count" />
          </div>
        </div>
      )}
      {players === 7 && (
        <div className="users-content">
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
          <div className="user">
            <CgPokemon className="icon-count"  />
          </div>
        </div>
      )}
    </div>
  );
};

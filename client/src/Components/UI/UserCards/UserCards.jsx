//import stylesheet
import "./UserCards.scss";
import axios from "axios";
//import socket
import socket from "../../../WebSockets/WebSockets";
import {PokeCard } from '../PokeCard/PokeCard';

//export a component
import React, { useEffect } from "react";

export const UserCards = () => {
  const [data, setData] = React.useState([]);

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


  //provisional data to test the component
 

  return(
  <div className="user-cards">
    <PokeCard url={'https://pokeapi.co/api/v2/pokemon/6'} />
    <PokeCard url={'https://pokeapi.co/api/v2/pokemon/7'} />
    <PokeCard url={'https://pokeapi.co/api/v2/pokemon/8'} />
    <PokeCard url={'https://pokeapi.co/api/v2/pokemon/9'} />
    <PokeCard url={'https://pokeapi.co/api/v2/pokemon/22'} />
    <PokeCard url={'https://pokeapi.co/api/v2/pokemon/33'} />
    <PokeCard url={'https://pokeapi.co/api/v2/pokemon/44'} />
  </div>);
};

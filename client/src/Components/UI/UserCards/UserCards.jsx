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

  useEffect(() => {
    //get the user cards
    getData();
  }, []);

  //provisional data to test the component
  const getData = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon/6")
      .then((response) => {
        return setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return(
  <div className="user-cards">
    <PokeCard data={data} />
  </div>);
};

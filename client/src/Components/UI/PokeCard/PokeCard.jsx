//import stylesheet
import axios from "axios";
import React from "react";
import "./PokeCard.scss";

//create a card render component
export const PokeCard = ({ data }) => {
   
  //destructuring the data
  const { name,img, stat1, hp , stat2 , attack , stat3 , defense , stat4 , speed, typed } = data;


  return (
    <div className="card-container">
      <h2 className="title-card">{name}</h2>
      <div className="img-card-container">
        <img alt={name} src={img} />
      </div>
      <div className="habilities-container">
        <div className="hability-content">
          <p>{stat1}</p>
          <p>{hp}</p>
        </div>
        <div className="hability-content">
          <p>{stat2}</p>
          <p>{attack}</p>
        </div>
        <div className="hability-content">
          <p>{stat3}</p>
          <p>{defense}</p>
        </div>
        <div className="hability-content">
          <p>{stat4}</p>
          <p>{speed}</p>
        </div>
      </div>
      <div className="type-container">
        <p className="type">{typed}</p>
      </div>
    </div>
  );
};

//import stylesheet
import axios from "axios";
import React from "react";
import "./PokeCard.scss";

//create a card render component
export const PokeCard = () => {
  const [name, setName] = React.useState("");
  const [img, setImg] = React.useState("");
  const [stat1, setStat1] = React.useState("");
  const [stat2, setStat2] = React.useState("");
  const [stat3, setStat3] = React.useState("");
  const [stat4, setStat4] = React.useState("");
  const [type, setType] = React.useState("");

  const getdata = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setImg(response.data.sprites.front_default);
        setStat1(response.data.stats[0].stat.name);
        setStat2(response.data.stats[1].stat.name);
        setStat3(response.data.stats[2].stat.name);
        setStat4(response.data.stats[3].stat.name);
        setType(response.data.types[0].type.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getdata();
  }, []);

  //destructuring the data
  // const { name, img, hab1, hab2, hab3, hab4, type } = data;
  return (
    <div className="card-container">
      <h2>{name}</h2>
      <div className="img-card-container">
        <img alt={name} src={img} />
      </div>
      <div className="habilities-container">
        <div className="hability-content">
          <p>{stat1}</p>
        </div>
        <div className="hability-content">
          <p>{stat2}</p>
        </div>
        <div className="hability-content">
          <p>{stat3}</p>
        </div>
        <div className="hability-content">
          <p>{stat4}</p>
        </div>
      </div>
      <div className="type-container">
        <p>{type}</p>
      </div>
    </div>
  );
};

import React from "react";
import GameContext from "../../../GameContext/GameContext";
//import socket
//import stylesheet
import "./Type.scss";

//component to select type of comparison
export const Type = () => {
  //state to save the type selected
  const [type, setType] = React.useState("");

  const { changeType } = React.useContext(GameContext);

  React.useEffect(() => {
    changeType(type);
  }, [type]);

  return (
    <div className="overlay-type">
      <div className="type-box">
        <div className="type-header">
            <h2>select the attribute for this round</h2>
        </div>
        <div className="type-selected">
          <div className="type-content" onClick={() => setType("hp")}>
            <p>hp</p>
          </div>
          <div className="type-content" onClick={() => setType("attack")}>
            <p>attack</p>
          </div>
          <div className="type-content" onClick={() => setType("defense")}>
            <p>defense</p>
          </div>
          <div className="type-content" onClick={() => setType("speed")}>
            <p>speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

//import react dependecies
import React from "react";
//create a game context with save the user data
const GameContext = React.createContext();

//create a provider to encapsulate the user data
export const GameProvider = ({ children }) => {
  //initial data state
  const [gameData, setGameData] = React.useState({});

  //Load data from localStorage to React state
  React.useEffect(() => {
    const jsonData = localStorage.getItem("gameData");
    const savedData = JSON.parse(jsonData);
    if (!savedData) return;
    // load data to state
    setGameData(savedData);
  }, []);


  const changeData = (timestamp) => {
    const dataToSave = { timestamp };
    // save data to LocalStorage and react State

    //data persistence
    localStorage.setItem("gameData", JSON.stringify(dataToSave));
    //update user data
    setGameData(dataToSave);
  };

  //save type to compare with the attribute type
  const changeType = (type) => {
    const dataToSave = { type };
    // save data to LocalStorage and react State
    const data = localStorage.getItem("gameData");
    const savedData = JSON.parse((item => [...item, dataToSave]));
    setGameData(savedData);    
  };
 
  const clearData = () => {
    //clear data from LocalStorage and react State
    const clear = null;
    localStorage.setItem("gameData", clear);
    setGameData(clear);
  };

  const game = {
    game: gameData, // we expose state that changes
    changeData, // change state and persist data
    clearData, // clear state and data
    changeType, // change state and persist data
  };

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export default GameContext;

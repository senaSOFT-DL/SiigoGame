//import react dependecies
import React from "react";
//create a game context with save the user data
const RoomContext = React.createContext();

//create a provider to encapsulate the user data
export const RoomProvider = ({ children }) => {
  //initial data state
  const [roomData, setRoomData] = React.useState({});

  //Load data from localStorage to React state
  React.useEffect(() => {
    const jsonData = localStorage.getItem("roomData");
    const savedData = JSON.parse(jsonData);
    if (!savedData) return;
    // load data to state
    setRoomData(savedData);
  }, []);

  const changeData = (room) => {
    const dataToSave = { room};
    // save data to LocalStorage and react State

    //data persistence
    localStorage.setItem("roomData", JSON.stringify(dataToSave));
    //update user data
    setRoomData(dataToSave);
  };

 
  const clearData = () => {
    //clear data from LocalStorage and react State
    const clear = null;
    localStorage.setItem("roomData", clear);
    setRoomData(clear);
  };

  const room = {
    room: roomData, // we expose state that changes
    changeData, // change state and persist data
    clearData, // clear state and data
  };

  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
};

export default RoomContext;

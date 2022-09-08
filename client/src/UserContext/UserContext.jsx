//import react dependecies
import React from "react";
//create a user context with save the user data
const UserContext = React.createContext();

//create a provider to encapsulate the user data
export const UserProvider = ({ children }) => {
  //initial data state
  const [userData, setUserData] = React.useState({});

  //Load data from localStorage to React state
  React.useEffect(() => {
    const jsonData = localStorage.getItem("userData");
    const savedData = JSON.parse(jsonData);
    if (!savedData) return;
    // load data to state
    setUserData(savedData);
  }, []);

  const changeData = (username, room , role) => {
    const dataToSave = { username, room , role };
    // save data to LocalStorage and react State

    //data persistence
    localStorage.setItem("userData", JSON.stringify(dataToSave));
    //update user data
    setUserData(dataToSave);
  };

  const data = {
    user: userData, // we expose state that changes
    changeData, // change state and persist data
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserContext;

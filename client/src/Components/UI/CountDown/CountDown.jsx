//import countdown dependencies
import React from "react";
import Countdown from 'react-countdown';
import GameContext from "../../../GameContext/GameContext";

export const CountDown = () => {
    const Completionist = () => <span>You are good to go!</span>;

    const { changeData } = React.useContext(GameContext);
    const [ complete ,setComplete] = React.useState(false);

    React.useEffect(() => {
        if(complete){
            console.log("complete");
            changeData('complete');
        }
    },[complete])

  return (
    <Countdown date={Date.now() + 3600000} onComplete={()=> setComplete(true)}>
        <Completionist  />
    </Countdown>
  )
}

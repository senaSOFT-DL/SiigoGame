//import countdown dependencies
import React from "react";
import Countdown from 'react-countdown';
import GameContext from "../../../GameContext/GameContext";
import './CountDown.scss';

export const CountDown = () => {
  //message completion
    const Completionist = () => <span>You are good to go!</span>;
   //state to change context
    const { changeData } = React.useContext(GameContext);
    const [ complete ,setComplete] = React.useState(false);

    React.useEffect(() => {
        if(complete){
            console.log("complete");
            changeData('complete');
        }
    },[complete])
  
  //return the component
  return (
    <div className="header-countdown">
      <Countdown className="countdown" date={Date.now() + 3600000} onComplete={()=> setComplete(true)}>
        <Completionist  />
    </Countdown>
    </div>
    
  )
}

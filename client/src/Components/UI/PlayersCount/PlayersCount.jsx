//import react and other dependencies
import React from 'react'
//import the context
import RoomContext from '../../../roomContext/RoomContext'
//import socket
import socket from "../../../WebSockets/WebSockets"
//import stylesheet
import './PlayersCount.scss'

export const PlayersCount = () => {
    //extract room from room context
    const { room } = React.useContext(RoomContext)

    const [ players, setPlayers ] = React.useState(0);

    React.useEffect(()=>{
        console.log(room)
        socket.emit("users:count" ,room.room ,(response )=>{
            console.log(response)
          return setPlayers(response.Users)
        })
        
    },[room , socket])
    
  return (
    <div className='count-players'>
        <p className='counter'>{players}</p> 
    </div>
  )
}

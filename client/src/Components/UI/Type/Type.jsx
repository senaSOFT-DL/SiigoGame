import React from 'react'
//import socket
//import stylesheet
import './Type.scss'

//component to select type of comparison
export const Type = () => {
    //state to save the type selected
    const [type, setType] = React.useState('')

    React.useEffect(() => {
        //send tipe of comparision to socket
        console.log(type);
    }, [type])

  return (
    <div className="type-selected">
        <div className="type-content" onClick={()=> setType('hp')}>
            <p>hp</p>
        </div>
        <div className="type-content" onClick={()=> setType('attack')}>
            <p>attack</p>
        </div>
        <div className="type-content" onClick={()=> setType('defense')}>
            <p>defense</p>
        </div>
        <div className="type-content" onClick={()=> setType('speed')}>
            <p>speed</p>
        </div>
    </div>
    
  )
}

//import stylesheet 
import "./AwaitRoom.scss";

//create a card render component
export const PokeCard = ({data}) => {
    //destructuring the data
    const { name , img , hab1 , hab2 , hab3 , hab4 , type } = data;
  return (
    <div className="card-container">
        <h2>{name}</h2>
        <div className="img-card-container">
            <img alt={name} src={img} />
        </div>
        <div className="habilities-container">
            <div className="hability-content">
                <p>{hab1}</p>
            </div>
            <div className="hability-content">
                <p>{hab2}</p>
            </div>
            <div className="hability-content"><p>{hab3}</p></div>
            <div className="hability-content"><p>{hab4}</p></div>
        </div>
        <div className="type-container">
            <p>{type}</p>
        </div>
    </div>
  )
}

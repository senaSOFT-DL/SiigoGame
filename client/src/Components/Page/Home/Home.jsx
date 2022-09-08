// Import dependencies and components
import React from "react";
import { Helmet } from "react-helmet";
import { Overlay } from "../../../Styles/StyledComponents";
import { MainMode } from "../../Layout/MainMode/MainMode";
import RoomContext from "../../../roomContext/RoomContext";
//import stylesheet
import "./Home.scss";
import socket from "../../../WebSockets/WebSockets";

//export the component
export default function Home() {

  

  return (
    <div>
      {
        //Helmet to add some SEO and meta tags
      }
      <Helmet>
        <title>Siigo Match Battle</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Siigo Match Battle" />
      </Helmet>
      {
        //MainMode component to render in Home page
      }
      <Overlay>
       <div className="banner-container">
        <img src="https://res.cloudinary.com/easyhouserent/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1662582532/samples/pokemon_oyl8li.jpg" alt="banner" />
       </div>
        <MainMode />
      </Overlay>
    </div>
  );
}

// Import dependencies and components
import React from "react";
import { Helmet } from "react-helmet";
import { Overlay } from "../../../Styles/StyledComponents";
import { MainMode } from "../../Layout/MainMode/MainMode";
//import stylesheet
import "./Home.scss";

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
        <h1>Siigo Battle match</h1>
        <MainMode />
      </Overlay>
    </div>
  );
}

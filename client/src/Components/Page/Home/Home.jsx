// Import dependencies and components
import React from "react";
import { Helmet } from "react-helmet";
import { MainMode } from "../../Layout/MainMode/MainMode";

//exoport the component
export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Siigo Match Battle</title>1
      </Helmet>
      <MainMode />
    </div>
  );
}

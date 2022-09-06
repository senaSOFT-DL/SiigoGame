//import dependencies and libraries 
import React, { Suspense } from "react";

//import components in lazy mode
const Home = React.lazy(() => import("./Components/Page/Home/Home"));

//return the component
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}

//export the component
export default App;

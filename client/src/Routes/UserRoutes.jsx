import React from 'react'
//import tags for routing web
import { BrowserRouter , Routes , Route } from 'react-router-dom'

//import page components in lazy mode
const Home = React.lazy(() => import('../Components/Page/Home/Home'));
const Game = React.lazy(() => import('../Components/Page/Game/Game'));

export const UserRoutes = () => {

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      </BrowserRouter>
    </React.Suspense>

  )
}

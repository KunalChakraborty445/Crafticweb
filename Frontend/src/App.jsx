import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import UseGetCurrentUser from './hooks/UseGetCurrentUser';
export const serverUrl = "http://localhost:4000";

const App = () => {

    UseGetCurrentUser();


  return (
    <BrowserRouter>
        <Routes>
            <Route  path="/"  element={<Home />}/>
        </Routes>
    </BrowserRouter>

 
  )
}

export default App

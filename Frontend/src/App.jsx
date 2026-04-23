import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import UseGetCurrentUser from './hooks/UseGetCurrentUser';
import Dashboard from './pages/Dashboard';
import SiteDemoPage from './pages/SiteDemoPage';
export const serverUrl = "http://localhost:4000";

const App = () => {

    UseGetCurrentUser();


  return (
    <BrowserRouter>
        <Routes>
            <Route  path="/"  element={<Home />}/>
            <Route  path="/dashboard"  element={<Dashboard />}/>
            <Route  path="/demo"  element={<SiteDemoPage />}/>
        </Routes>
    </BrowserRouter>

 
  )
}

export default App

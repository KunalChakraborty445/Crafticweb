import React, { useState } from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import UseGetCurrentUser from './hooks/UseGetCurrentUser';
import Dashboard from './pages/Dashboard';
import SiteDemoPage from './pages/SiteDemoPage';
import Generate from './pages/Generate';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/Auth/ProtectedRoute.jsx';
import LoginModel from './Components/Auth/LoginModel.jsx';
export const serverUrl = "http://localhost:4000";

const App = () => {

    UseGetCurrentUser();

    const { userData } = useSelector(state => state.user);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <BrowserRouter>
      <LoginModel open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Routes>
        <Route path="/" element={<Home openLogin={() => setLoginOpen(true)} />} />
        <Route path="/demo" element={<SiteDemoPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute element={<Dashboard />} openLogin={() => setLoginOpen(true)} />
        } />
        <Route path="/generate" element={
          <ProtectedRoute element={<Generate />} openLogin={() => setLoginOpen(true)} />
        } />
      </Routes>
    </BrowserRouter>

 
  )
}

export default App

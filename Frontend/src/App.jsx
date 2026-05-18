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
import WebsiteEditor from './pages/WebsiteEditor.jsx';
import PricingPage from './pages/PricingPage.jsx';
import LiveSite from './pages/LiveSite.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
export const serverUrl = "https://crafticweb.onrender.com";

const App = () => {

    UseGetCurrentUser();

    const { loading } = useSelector(state => state.user);
  const [loginOpen, setLoginOpen] = useState(false);

   if (loading) return (
    <div className="min-h-screen bg-[#040404] flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white animate-spin" />
    </div>
  );

  return (
    <BrowserRouter>
      <LoginModel open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Routes>
        <Route path="/" element={<Home openLogin={() => setLoginOpen(true)} />} />
        <Route path="/demo" element={<SiteDemoPage />} />
        <Route path="/site/:id" element={<LiveSite />} />
        <Route path="/dashboard" element={
          <ProtectedRoute element={<Dashboard />} openLogin={() => setLoginOpen(true)} />
        } />
        <Route path="/generate" element={
          <ProtectedRoute element={<Generate />} openLogin={() => setLoginOpen(true)} />
        } />
        <Route path="/editor/:id" element={
          <ProtectedRoute element={<WebsiteEditor />} openLogin={() => setLoginOpen(true)} />
        } />
        <Route path="/pricing" element={
          <ProtectedRoute element={<PricingPage />} openLogin={() => setLoginOpen(true)} />
        } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

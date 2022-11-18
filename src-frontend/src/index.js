import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { Header } from './components'
import Home from './pages/Home/home'
import Homepage from './pages/Homepage/index.js'
import Forms from './pages/Login'
import Profile from './pages/profile/profile.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login2';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/home" element={<Home />} ></Route>
          <Route path="/profile" element={<Profile />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode >
);
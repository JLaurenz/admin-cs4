import React, { useEffect, useRef } from 'react';
import './Styles/App.css';
import Login from './pages/Login'
import Register from './pages/Register';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import ForgotPass from './pages/ForgotPass';


function App() {
  return (
      <div className="App">
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register  />} />
            <Route path="/forgotpass" element={<ForgotPass />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </>
      </div>
  );
}

export default App;
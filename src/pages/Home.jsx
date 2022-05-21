import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import Map from '../components/Map.jsx';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
  let navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/')
  }
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      console.log('logged in')
      navigate('/home')
    }
    if (!authToken) {
      navigate('/')
    }
  }, [])

  return (
    <div className="container">
      <div className="content">
        <div className="heading-container">
            <div className="Nav">
                <MenuIcon onClick={handleLogout} />
            </div>
        </div>
        <div className="map-container">
          <Map />
        </div>
      </div>
    </div>
  )
}
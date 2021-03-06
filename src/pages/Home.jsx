import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import Map from '../components/Map.jsx';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar.jsx';

export default function Home() {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu = () => {
    setOpen(!open);
  };

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
      <div className="heading-container">
        <div className="Nav">
          <Sidebar />
        </div>
      </div>
      <div className="content">
        <div className="map-container">
          <Map />
        </div>
      </div>
    </div>
  )
}
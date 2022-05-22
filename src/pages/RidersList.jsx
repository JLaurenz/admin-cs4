import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import Map from '../components/Map.jsx';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar.jsx';

export default function RidersList() {
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
  return (
    <div className="container">
      <div className="heading-container">
        <div className="Nav">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
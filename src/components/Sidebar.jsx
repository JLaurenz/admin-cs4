import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import * as MUIIcons from '@mui/icons-material';
import { SidebarData } from './SidebarData';
import '../Styles/Sidebar.css';
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [sidebar, setSideBar] = useState(false);
  const toggleSidebar = () => setSideBar (!sidebar);

  let navigate = useNavigate();
  
  const handleLogout = () => {
      sessionStorage.removeItem('Auth Token');
      navigate('/');
  }



  return (
  <>
  <IconContext.Provider value={{ color: '#000000' }}>
    <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
      <ul className='nav-menu-items' onClick={toggleSidebar} >
        <li className='navbar-toggle' >
          <Link to="#" className='menu-bars'>
            <MUIIcons.MenuOpenSharp/>
          </Link>
        </li>
        { SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span className='Menu-text'>{item.title}</span>
              </Link>
            </li>
          )
        })}
        <li>
          <MUIIcons.LogoutSharp onClick={handleLogout}/>
        </li>
      </ul>
    </nav>
  </IconContext.Provider>
  </>
  )
}

export default Sidebar
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import * as MUIIcons from '@mui/icons-material';
import { SidebarData } from './SidebarData';
import '../Styles/Home.css';
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [sidebar, setSideBar] = useState(false);
  const toggleSidebar = () => setSideBar (!sidebar);

  let navigate = useNavigate();
  console.log(sidebar);
  
  const handleLogout = () => {
      sessionStorage.removeItem('Auth Token');
      navigate('/');
  }

  return (
  <>
  <IconContext.Provider value={{ color: '#000000' }}>
    <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
      <ul className='nav-menu-items' onClick={toggleSidebar} >
        { SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
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
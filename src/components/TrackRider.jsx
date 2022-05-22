import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'RidersList',
        path: '/riders-list',
        icon: <FaIcons.FaListAlt />,
        cName: 'nav-text'
    },
    {
        title: 'DisplayedRiders',
        path: '/displayed-riders',
        icon: <RiIcons.RiMotorbikeFill/>,
        cName: 'nav-text'
    },
    {
        title: 'About',
        path: '/about',
        icon: <FaIcons.FaRegQuestionCircle />,
        cName: 'nav-text'
    },
]
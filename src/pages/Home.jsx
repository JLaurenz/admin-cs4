import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import Map from '../components/Map.jsx';
export default function Home() {

    
    let navigate = useNavigate();

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
                    <Map />
                </div>
            </div>
        </div>
    )
}
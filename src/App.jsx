import React, { useEffect, useRef } from 'react';
import './Styles/App.css';
import Login from './pages/Login'
import Register from './pages/Register';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Home from './pages/Home';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleAction = (id) => {
    console.log(id)
    const authentication = getAuth();
    console.log(id);
    if (id === 1) {
      console.log('register');
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home');
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if(error.code === 'auth/wrong-password'){
            console.log('Please check the Password');

          }
          if(error.code === 'auth/user-not-found'){
            console.log('Please check the Email');
          }
        })
    }

    else if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home');
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          console.log(error);
          if(error.code === 'auth/weak-password'){
            console.log('Password should be at least 6 characters');
          }
          if(error.code === 'auth/email-already-in-use'){
            console.log('Please enter a valid Email');
          }
        })
    }
  }
  // if logged in, redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem('Auth Token')) {
      navigate('/home');
    }
  }, [])

  // create an array for selected riders
  
  return (
      <div className="App">
        <>
          <Routes>
            <Route path="/" element={<Login  setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
            <Route path="/register" element={<Register setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)} />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </>
      </div>
  );
}

export default App;
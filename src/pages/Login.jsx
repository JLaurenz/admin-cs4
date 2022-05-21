import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { app } from '../firebase-config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const notify = (message, type) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2500,
    type: type
  });
};

export default function SignIn() {
  let navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const auth = getAuth();

  const handleEmailChange = (event) => { setEmail(event.target.value); };
  const handlePasswordChange = (event) => { setPassword(event.target.value); };
  const handleCheckboxChange = (event) => { setIsChecked(event.target.checked); };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Email === '' || Password === '') {
      notify('Please fill in all fields', 'error');
    } else {
      signInWithEmailAndPassword(auth, Email, Password)
        .then((response) => {
          if (isChecked) {
            // remember user
            localStorage.setItem('email', Email);
            localStorage.setItem('password', Password);
          } else {
            // forget user
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          } 
          navigate('/home');
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            notify('User not found', 'error');
          } else if (error.code === 'auth/invalid-email') {
            notify('Invalid email', 'error');
          } else if (error.code === 'auth/wrong-password') {
            notify('Wrong password', 'error');
          } else if (error.code === 'auth/quota-exceeded') {
            notify('Too many requests please try again after 5 minutes', 'error');
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField margin="normal" required fullWidth id="Email" label="Email " name="Email" autoComplete="email" autoFocus onChange={(e) => setEmail(e.target.value)}/>
            <TextField margin="normal" required fullWidth  id="Password" label="Password"  name="Password" type="password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)}/>
            <FormControlLabel control={<Checkbox value="remember" color="primary" onChange={(e) => setIsChecked(true)} />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpass" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
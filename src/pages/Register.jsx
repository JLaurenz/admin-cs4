import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {db, app} from '../firebase-config';
import {collection, setDoc, doc, Timestamp} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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



export default function SignUp() {
  const [CompanyName, setCompanyName] = useState(''); 
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

  const auth = getAuth();
  let navigate = useNavigate();
  const handleCompanyNameChange = (event) => { setCompanyName(event.target.value); };
  const handleEmailChange = (event) => { setEmail(event.target.value); };
  const handlePasswordChange = (event) => { setPassword(event.target.value); };
  const handleConfirmPasswordChange = (event) => { setConfirmPassword(event.target.value); };

  // get firestore collection
  const storage = collection(db, 'Company Code');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (CompanyName === '' || Email === '' || Password === '' || confirmPassword === '') {
      notify('Please fill in all fields', 'error');
    } else if (Password !== confirmPassword) {
      notify('Passwords do not match', 'error');
    } else {
      // create random four digit number
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      const randomNumberString = randomNumber.toString();

      createUserWithEmailAndPassword(auth, Email, Password)
        .then(() => {
          setDoc(doc(db, "Company Code", randomNumberString), { CompanyName: CompanyName, Key: CompanyName.toLowerCase() })
          .catch(() => {
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            const randomNumberString = randomNumber.toString();
            setDoc(doc(db, "Company Code", randomNumberString), { CompanyName: CompanyName, Key: CompanyName.toLowerCase() })
          })
          notify('Account created', 'success');
          // navigate to login page after 5 seconds
          setTimeout(() => {
            navigate('/');
          }, 2500);
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            notify('Email already in use ', 'error');
          } else if (error.code === 'auth/invalid-email') {
            notify('Invalid email address', 'error');
          } else if (error.code === 'auth/weak-password') {
            notify('Password is too weak', 'error');
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <ToastContainer />
        <CssBaseline />
        <Box sx={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth id="CompanyName" label="Company Name" name="CompanyName" autoComplete="company-name" onChange={(e) => setCompanyName(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
								<TextField required fullWidth id="Email" label="Email " name="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth  id="Password" label="Password"  name="Password" type="password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="ConfirmPassword" label="Confirm Password"  name="ConfirmPassword" type="password" autoComplete="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)}/>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
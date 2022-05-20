import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../components/Button';
import * as FaIcons from 'react-icons/fa';
import { useState } from 'react';


function Login({ setPassword, setEmail, handleAction }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    return (
        <center>
        <div className="content">
            <div className="heading-container">
                <h3>
                    Login Form
                </h3>
            </div>

            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '35ch' }, }} noValidate autoComplete="off" >
                <TextField fullWidth id="email" label="Enter the Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
            </Box>

            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '35ch' }, }} noValidate autoComplete="off" >
                <TextField fullWidth id="password" label="Enter the Password" variant="outlined" type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)}/>
                <FaIcons.FaEye  className='eye' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />
            </Box>

            <Box>
            <Button title='Login' handleAction={handleAction}/>
            </Box>
        </div>
        </center>
    );
}
export default Login;
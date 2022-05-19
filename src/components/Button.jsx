import * as React from 'react';
import Button from '@mui/material/Button';
import '../Styles/Login.css';

export default function BasicButtons({title, handleAction}) {
    return (
        <Button className="form-button" variant="contained" onClick={handleAction}>{title}</Button>
    );
}
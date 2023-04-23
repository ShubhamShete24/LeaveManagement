import React from 'react';
import { Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import mainLogo from '../../assets/images/SteelSoft_Logo.jpg';
import './Login.scss';

export default function Login({ setIsSignUp, isSignUp }) {
  const handleClick = () => {
    setIsSignUp(!isSignUp);
  };
  return (
    <div className="containerr">
      <div className="box">
        <div className="loginForm">
          <TextField required id="standard-required" label="Name" variant="standard" />
          <TextField required id="standard-required" label="UserName" variant="standard" />
          <TextField required id="standard-required" label="Email" variant="standard" />
          <TextField required id="standard-required" label="Password" variant="standard" />
          <TextField required id="standard-required" label="Repeat password" variant="standard" />
          <div className="loginButton">
            <Button variant="outline-primary" onClick={() => handleClick()}>
              Sign Up
            </Button>
          </div>
        </div>
        <div className="img">
          <img src={mainLogo} alt="SteelSoft" />
        </div>
      </div>
    </div>
  );
}
Login.propTypes = {
  setIsSignUp: PropTypes.bool,
  isSignUp: PropTypes.bool
};

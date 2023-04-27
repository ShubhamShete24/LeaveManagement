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
          <TextField required label="Name" />
          <TextField required label="UserName" />
          <TextField required label="Email" />
          <TextField required label="Password" />
          <TextField required label="Repeat password" />
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

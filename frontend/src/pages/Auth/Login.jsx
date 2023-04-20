import React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';
import mainLogo from '../../assets/images/SteelSoft_Logo.jpg';
import './Login.scss';

export default function Login({ setIsSignUp, isSignUp }) {
  const handelClick = () => {
    setIsSignUp(!isSignUp);
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="containerr">
      <div className="box">
        <div className="img">
          <img src={mainLogo} alt="SteelSoft" />
        </div>
        <div className="loginForm">
          {/* password */}
          <TextField
            error
            id="standard-error-helper-text"
            label="Email"
            // defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="standard"
            sx={{ m: 1, width: '35ch' }}
          />
          <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className="loginButton">
            <Button variant="outline-primary"> Sign In </Button>
            <a className="text-muted" href="#!">
              Forgot password?
            </a>
          </div>
          <div className="signupButton">
            <p className="mb-0 me-2">Don't have an account?</p>
            <Button variant="outline-danger" onClick={() => handelClick()}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

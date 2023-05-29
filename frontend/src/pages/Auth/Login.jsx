import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import mainLogo from '../../assets/images/SteelSoft_Logo.jpg';
import './Login.scss';
import { LoginUserDetails } from '../../redux/actions/loginUserDetailsActions';
import { USER_INFO_KEY } from '../../utils/constants';

export default function Login({ setIsSignUp, isSignUp }) {
  const navigate = useNavigate();
  const response = useSelector((state) => state.LoginUserDetailsReducer.response);
  useEffect(() => {
    if (response.user != null || localStorage.getItem(USER_INFO_KEY)) {
      navigate('/dashboard');
    }
  }, [navigate, response, setIsSignUp, isSignUp]);

  const [authForm, setAuthForm] = useState({
    email: '',
    password: ''
  });
  const handleInputChange = (changeEvent) => {
    const { name, value } = changeEvent.target;
    setAuthForm({ ...authForm, [name]: value });
  };
  const dispatch = useDispatch();
  const handleSignIn = () => {
    dispatch(LoginUserDetails(authForm));
    setAuthForm({
      email: '',
      password: ''
    });
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignIn(event);
    }
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
          <ul>{response.message}</ul>
          <TextField
            fullWidth
            name="email"
            onChange={handleInputChange}
            sx={{ m: 1, width: '35ch' }}
            label="Email"
            required
          />

          <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
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
              label="Password"
            />
          </FormControl>
          <div className="loginButton">
            <Button variant="outline-primary" type="button" onClick={handleSignIn}>
              Sign In
            </Button>
            <a className="text-muted" href="">
              Forgot password?
            </a>
          </div>
          {/* <div className="signupButton">
            <p className="mb-0 me-2">Don't have an account?</p>
            <Button variant="outline-danger" onClick={() => handleClick()}>
              Sign Up
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
Login.propTypes = {
  setIsSignUp: PropTypes.bool,
  isSignUp: PropTypes.bool
};

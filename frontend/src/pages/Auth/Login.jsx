import React from 'react';
import './Login.scss';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import mainLogo from '../../assets/images/5.jpg';

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
            sx={{ m: 1, width: '25ch' }}
          />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
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
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" size="medium">
              LogIn
            </Button>
            <Button variant="outlined" color="primary">
              Forgot Password
            </Button>
          </Stack>
          {/* <button type="button" onClick={() => handelClick()}>
            signup
          </button> */}
        </div>
      </div>
    </div>
  );
}

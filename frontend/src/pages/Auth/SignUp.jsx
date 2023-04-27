import React from 'react';
import { Button } from 'react-bootstrap';
import { Box, Grid, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import mainLogo from '../../assets/images/SteelSoft_Logo.jpg';
import './Login.scss';

export default function Login({ setIsSignUp, isSignUp }) {
  const theme = createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          sx: { m: 0, width: '35ch' }
        }
      }
    }
  });
  const handleClick = () => {
    setIsSignUp(!isSignUp);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="containerr">
        <div className="box">
          <div className="loginForm">
            <Grid container spacing={2} justify="center">
              <Grid item xs={12} md={6}>
                <Box>
                  <form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField required label="Name" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField required label="UserName" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField required label="Email" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField required label="Password" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField required label="Repeat password" fullWidth />
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Grid>
            </Grid>
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
    </ThemeProvider>
  );
}
Login.propTypes = {
  setIsSignUp: PropTypes.bool,
  isSignUp: PropTypes.bool
};

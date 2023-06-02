import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Box, CircularProgress, Grid, IconButton, Snackbar, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import mainLogo from '../../assets/images/SteelSoft_Logo.jpg';
import { RESET_MESSGE_USER_DETAILS } from '../../redux/constants';
import './Login.scss';
import { SendResetPasswordLink } from '../../redux/actions/userDetailActions';

export default function ForgotPassword({ setIsForgotPassword, isForgotPassword }) {
  const theme = createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          sx: { m: 0, width: '35ch' }
        }
      }
    }
  });
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [loading, setLoading] = useState('none');
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
    setSnackBarMessage('');
    dispatch({
      type: RESET_MESSGE_USER_DETAILS
    });
  };
  const messageForTryingToSendResetPasswordLinkToEmail =
    useSelector((state) => state.UserDetailReducers?.message) || '';
  useEffect(() => {
    if (messageForTryingToSendResetPasswordLinkToEmail !== '') {
      setLoading('none');
      setIsSnackBarOpen(true);
      setSnackBarMessage(messageForTryingToSendResetPasswordLinkToEmail);
    }
  }, [messageForTryingToSendResetPasswordLinkToEmail]);
  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackBarClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  const [email, setEmail] = useState('');
  const handleOnChangeEmailField = (event) => {
    setEmail(event.target.value);
  };
  const dispatch = useDispatch();
  const sendEmail = (event) => {
    event.preventDefault();
    // create link
    const webURL = window.location.origin;
    dispatch(
      SendResetPasswordLink({
        email,
        hostName: webURL
      })
    );
    setLoading('block');
  };
  const handleClick = () => {
    setIsForgotPassword(!isForgotPassword);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="containerr">
        <div className="box">
          <div className="loginForm">
            <Grid container spacing={2} justify="center">
              <form onSubmit={sendEmail}>
                <Grid item xs={12}>
                  <TextField required label="Email" fullWidth onChange={handleOnChangeEmailField} value={email} />
                </Grid>
                <div className="loginButton">
                  <Button type="submit" variant="outline-primary">
                    Forgot password
                  </Button>
                </div>
              </form>
            </Grid>
            <a className="text-muted" href="#" onClick={() => handleClick()}>
              Sign in?
            </a>
          </div>
          <div className="img">
            <img src={mainLogo} alt="SteelSoft" />
          </div>
        </div>
      </div>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message={snackBarMessage}
        action={action}
      />
      <Box sx={{ position: 'relative', display: loading }}>
        <CircularProgress
          sx={{
            position: 'absolute',
            bottom: 50,
            left: 50,
            zIndex: 1
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
ForgotPassword.propTypes = {
  setIsForgotPassword: PropTypes.func,
  isForgotPassword: PropTypes.bool
};

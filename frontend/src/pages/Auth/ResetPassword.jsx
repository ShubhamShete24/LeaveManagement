import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jwt-decode';
import { Button, TextField, Typography } from '@mui/material';
import { GetPasswordUpdateStatus, RecreatePassword } from '../../redux/actions/userDetailActions';
import './Login.scss';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const messageAfterRequestingForResettingOfPassword = useSelector((state) => state.UserDetailsReducers?.message);
  const passwordUpdateStatus = useSelector((state) => state.UserDetailReducers?.passwordUpdateStatus);
  const recreatePasswordResponse = useSelector((state) => state.UserDetailReducers?.passwordResetProcessResponse);
  useEffect(() => {
    if (messageAfterRequestingForResettingOfPassword !== '') {
      console.log(messageAfterRequestingForResettingOfPassword);
    }
  }, [messageAfterRequestingForResettingOfPassword]);

  const token = window.location.href.split('token=')[1];
  const data = jwt(token);
  const [scenario, setScenario] = useState(3);

  useEffect(() => {
    console.log(data.email);
    dispatch(
      GetPasswordUpdateStatus({
        email: data.email
      })
    );
  }, []);

  useEffect(() => {
    console.log(passwordUpdateStatus, 'hello');
    if (passwordUpdateStatus !== 1) {
      setScenario(1);
    } else {
      setScenario(3);
    }
    if (Date.now() >= data.exp * 1000) {
      setScenario(2);
    }
  }, [passwordUpdateStatus]);
  useEffect(() => {
    console.log(recreatePasswordResponse);
    if (recreatePasswordResponse !== null) {
      console.log(recreatePasswordResponse);
      setScenario(4);
    }
  }, [recreatePasswordResponse]);
  const [passwordResetForm, setPasswordResetForm] = useState({});
  const handleFieldValueChange = (event) => {
    const { name, value } = event.target;
    setPasswordResetForm({ ...passwordResetForm, [name]: value });
  };
  const handleRestPasswordformSubmit = (e) => {
    e.preventDefault();
    if (
      passwordResetForm.password === passwordResetForm.verifyPassword &&
      passwordResetForm.password !== '' &&
      passwordResetForm.verifyPassword !== ''
    ) {
      console.log(data);
      dispatch(
        RecreatePassword({
          userId: data.id,
          emailId: data.email,
          password: passwordResetForm.password
        })
      );
    } else {
      alert('Please ensure password nd retyped password matches or none of the fields are empty');
    }
  };

  return scenario === 3 ? (
    <div className="containerr">
      <div className="box">
        <form onSubmit={handleRestPasswordformSubmit} className="form">
          <Typography variant="h4" gutterBottom>
            Reset password here!
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            sx={{ m: 2 }}
            onChange={handleFieldValueChange}
          />
          <TextField
            id="outlined-password-input"
            label="Retype password"
            type="password"
            autoComplete="current-password"
            sx={{ m: 2 }}
            name="verifyPassword"
            onChange={handleFieldValueChange}
          />
          <Button type="submit" variant="contained">
            Reset password
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div>
      {scenario === 2 ? (
        <div className="containerr">
          <div className="box">
            <Typography variant="subtitle1" gutterBottom>
              Link has expired. Please request again for reset password link if you still wnt to reset the password.
              Thank you!
            </Typography>
          </div>
        </div>
      ) : (
        <div>
          {scenario === 1 ? (
            <div className="containerr">
              <div className="box" style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom sx={{ mx: 'auto' }}>
                  You are viewing this page due to one of the following cases:
                </Typography>
                <ul style={{ margin: '2rem 0 2rem 0' }}>
                  <li>You have already reset your password once.</li>
                  <li>You not request for a reset password link yet.</li>
                </ul>
                <p>If you want to reset your password then request for a password reset link</p>
              </div>
            </div>
          ) : (
            <div className="containerr">
              <div className="box">
                <Typography variant="subtitle2" gutterBottom>
                  Your passowrd has been reset. You can log in using your new password
                </Typography>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

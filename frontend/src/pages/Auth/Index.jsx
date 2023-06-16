import React, { useState } from 'react';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

export default function Index() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  return isForgotPassword ? (
    <ForgotPassword isForgotPassword={isForgotPassword} setIsForgotPassword={setIsForgotPassword} />
  ) : (
    <Login isForgotPassword={isForgotPassword} setIsForgotPassword={setIsForgotPassword} />
  );
}

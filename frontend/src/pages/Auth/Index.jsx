import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

export default function Index() {
  const [isSignUp, setIsSignUp] = useState(false);
  return !isSignUp ? (
    <Login isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
  ) : (
    <SignUp isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
  );
}

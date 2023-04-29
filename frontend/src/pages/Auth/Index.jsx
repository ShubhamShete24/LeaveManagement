import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

export default function Index() {
  const [isSignUp, setIsSignUp] = useState(false);
  return <Login isSignUp={isSignUp} setIsSignUp={setIsSignUp} />;
}

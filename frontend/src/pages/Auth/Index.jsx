import React, { useState } from 'react';
import Login from './Login';

export default function Index() {
  const [isSignUp, setIsSignUp] = useState(false);
  return <Login isSignUp={isSignUp} setIsSignUp={setIsSignUp} />;
}

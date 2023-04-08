import React from 'react';
import mainLogo from '../../assets/images/5.jpg';
import logo from '../../assets/images/Steels.png';
import './Login.scss';

export default function Login({ setIsSignUp, isSignUp }) {
  const handelClick = () => {
    setIsSignUp(!isSignUp);
  };
  return (
    <div className="containerr">
      <div className="box">
        <div className="loginForm">
          <button type="button" onClick={() => handelClick()}>
            signup
          </button>
        </div>
        <div className="img">
          <img src={mainLogo} alt="SteelSoft" />
        </div>
      </div>
    </div>
  );
}

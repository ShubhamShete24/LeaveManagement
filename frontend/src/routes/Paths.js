import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import LeavePage from '../components/Leaves';
// import SignUp from '../pages/Dashboard/SignUp';

function Paths() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/leave" element={<LeavePage />} />
        {/* <Route path="/" element={<SignUp />} /> */}
      </Routes>
    </div>
  );
}

export default Paths;

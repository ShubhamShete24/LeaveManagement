import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Index from '../pages/Auth/Index';

function Paths() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Index />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Paths;

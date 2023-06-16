import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Index from '../pages/Auth/Index';
import ResetPassword from '../pages/Auth/ResetPassword';

function Paths() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default Paths;

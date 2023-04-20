import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import LeavePage from '../components/Leaves';
import Dashboard from '../pages/Dashboard/Dashboard';
import UserForm from '../components/UserForm';

function Paths() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<UserForm />} />
      </Routes>
    </div>
  );
}

export default Paths;

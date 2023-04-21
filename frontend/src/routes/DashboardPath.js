import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import LeavePage from '../components/Leaves';
import Dashboard from '../pages/Dashboard/Dashboard';
import UserForm from '../components/UserForm';
import PersonalDetails from '../components/PersonalDetails';
import AllDetails from '../components/AllDetails';

function DashboardPath() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/user" element={<UserForm />} />
        <Route path="/personal-info" element={<PersonalDetails />} />
        <Route path="/details" element={<AllDetails />} />
      </Routes>
    </div>
  );
}

export default DashboardPath;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Dashboard/Home';
import Leaves from '../components/Leaves';
import UserForm from '../pages/CreateUser/UserForm';
import PersonalDetails from '../pages/CreateUser/PersonalDetails';
import AllDetails from '../pages/CreateUser/AllDetails';
import HolidayPage from '../pages/Leave/HolidayPage';
import LeaveSanctioner from '../pages/Leave/LeaveSanctioner';

function DashboardPaths() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leave" element={<Leaves />} />
        <Route path="/user" element={<UserForm />} />
        <Route path="/personal-info" element={<PersonalDetails />} />
        <Route path="/details" element={<AllDetails />} />
        <Route path="/holiday" element={<HolidayPage />} />
        <Route path="/leave-sanctioner" element={<LeaveSanctioner />} />
      </Routes>
    </div>
  );
}

export default DashboardPaths;

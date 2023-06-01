import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Dashboard/Home';
import Leaves from '../pages/Leave/Leaves';
import UserForm from '../pages/CreateUser/UserForm';
import PersonalDetailsForm from '../pages/CreateUser/PersonalDetailsForm';
import EmploymentDetailsForm from '../pages/CreateUser/EmploymentDetailsForm';
import HolidayPage from '../pages/holidays/HolidayPage';
import HolidayForm from '../pages/holidays/HolidayForm';
import LeaveSanctioner from '../pages/Leave/LeaveSanctioner';
import { USER_INFO_KEY } from '../utils/constants';
import Users from '../pages/CreateUser/Users';

function DashboardPaths() {
  const sessionData =
    useSelector((state) => state.LoginUserDetailsReducer.response) || JSON.parse(localStorage.getItem(USER_INFO_KEY));

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leave" element={<Leaves />} />
        <Route path="/holiday" element={<HolidayPage />} />
        {sessionData?.user[0]?.role[0]?.roleName === 'ADMIN' ? (
          <>
            <Route path="/user" element={<Users />} />
            <Route path="/user-details" element={<UserForm />} />
            <Route path="/personal-info" element={<PersonalDetailsForm />} />
            <Route path="/employment-details" element={<EmploymentDetailsForm />} />
            <Route path="/holiday-form" element={<HolidayForm />} />
          </>
        ) : null}
        {sessionData?.user[0]?.role[0]?.roleName === 'MANAGER' ||
        sessionData?.user[0]?.role[0]?.roleName === 'ADMIN' ? (
          <Route path="/leave-sanctioner" element={<LeaveSanctioner />} />
        ) : null}
      </Routes>
    </div>
  );
}

export default DashboardPaths;

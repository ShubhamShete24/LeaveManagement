import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Dashboard/Home';
import Leaves from '../components/Leaves';
import UserForm from '../pages/CreateUser/UserForm';
import PersonalDetailsForm from '../pages/CreateUser/PersonalDetailsForm';
import EmploymentDetailsForm from '../pages/CreateUser/EmploymentDetailsForm';
import HolidayPage from '../pages/Leave/HolidayPage';
import LeaveSanctioner from '../pages/Leave/LeaveSanctioner';
import { USER_INFO_KEY } from '../utils/constants';

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
            <Route path="/user" element={<UserForm />} />
            <Route path="/personal-info" element={<PersonalDetailsForm />} />
            <Route path="/details" element={<EmploymentDetailsForm />} />
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

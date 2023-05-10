import React from 'react';
import {
  Home,
  Event,
  AccountCircle,
  // PermContactCalendar,
  // Dataset,
  HolidayVillage,
  Approval
} from '@mui/icons-material';

const sidebarConfig = [
  {
    title: 'Home',
    icon: <Home />,
    path: '/dashboard/',
    scope: ['ADMIN', 'EMPLOYEE', 'MANAGER']
  },
  {
    title: 'Leave',
    icon: <Event />,
    path: '/dashboard/leave',
    scope: ['ADMIN', 'EMPLOYEE', 'MANAGER']
  },
  {
    title: 'Create User',
    icon: <AccountCircle />,
    path: '/dashboard/user',
    scope: ['ADMIN']
  },
  // {
  //   title: 'Personal Info',
  //   icon: <PermContactCalendar />,
  //   path: '/dashboard/personal-info',
  //   scope: ['ADMIN']
  // },
  // {
  //   title: 'Employee Details',
  //   icon: <Dataset />,
  //   path: '/dashboard/employee-details',
  //   scope: ['ADMIN']
  // },
  {
    title: 'Holidays',
    icon: <HolidayVillage />,
    path: '/dashboard/holiday',
    scope: ['ADMIN', 'MANAGER', 'EMPLOYEE']
  },
  {
    title: 'Leave sanctioner',
    icon: <Approval />,
    path: '/dashboard/leave-sanctioner',
    scope: ['ADMIN', 'MANAGER']
  }
];

export default sidebarConfig;

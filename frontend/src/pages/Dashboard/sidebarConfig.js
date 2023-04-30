import React from 'react';
import {
  Home,
  Event,
  AccountCircle,
  PermContactCalendar,
  Dataset,
  HolidayVillage,
  Approval
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

const sidebarConfig = [
  {
    title: 'Home',
    icon: <Home />,
    path: '/dashboard/'
  },
  {
    title: 'Leave',
    icon: <Event />,
    path: '/dashboard/leave'
  },
  {
    title: 'Create User',
    icon: <AccountCircle />,
    path: '/dashboard/user'
  },
  {
    title: 'Personal Info',
    icon: <PermContactCalendar />,
    path: '/dashboard/personal-info'
  },
  {
    title: 'Employee Details',
    icon: <Dataset />,
    path: '/dashboard/details'
  },
  {
    title: 'Holidays',
    icon: <HolidayVillage />,
    path: '/dashboard/holiday'
  },
  {
    title: 'Leave sanctioner',
    icon: <Approval />,
    path: '/dashboard/leave-sanctioner'
  }
];

export default sidebarConfig;

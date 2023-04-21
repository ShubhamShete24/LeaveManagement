import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DatasetIcon from '@mui/icons-material/Dataset';

const sidebarConfig = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    path: '/home'
  },
  {
    title: 'Leave',
    icon: <EventIcon />,
    path: '/leave'
  },
  {
    title: 'User',
    icon: <AccountCircleIcon />,
    path: '/user'
  },
  {
    title: 'Personal Info',
    icon: <PermContactCalendarIcon />,
    path: '/personal-info'
  },
  {
    title: 'All Data',
    icon: <DatasetIcon />,
    path: '/details'
  }
];

export default sidebarConfig;

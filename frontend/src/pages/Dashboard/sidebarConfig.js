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
    path: '/dashboard/'
  },
  {
    title: 'Leave',
    icon: <EventIcon />,
    path: '/dashboard/leave'
  },
  {
    title: 'User',
    icon: <AccountCircleIcon />,
    path: '/dashboard/user'
  },
  {
    title: 'Personal Info',
    icon: <PermContactCalendarIcon />,
    path: '/dashboard/personal-info'
  },
  {
    title: 'All Data',
    icon: <DatasetIcon />,
    path: '/dashboard/details'
  }
];

export default sidebarConfig;

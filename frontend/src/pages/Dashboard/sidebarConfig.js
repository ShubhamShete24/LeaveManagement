import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const sidebarConfig = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    path: '/'
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
  }
];

export default sidebarConfig;

import React, { useEffect, useState } from 'react';
import { styled, useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent } from '@mui/material';
import sidebarConfig from './sidebarConfig';
import { USER_INFO_KEY } from '../../utils/constants';
import { logoutUser } from '../../utils/rest-services';
import DashboardPaths from '../../routes/DashboardPaths';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  backgroundColor: '#FCF8F1',
  borderBottom: 'none',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  backgroundColor: '#FCF8F1',
  '& .MuiPaper-root': {
    backgroundColor: '#FCF8F1' // set the background color of the drawer paper
  },
  overflow: 'auto',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

function Dashboard() {
  const cardTheme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: '40px',
            marginBottom: '8px' // adjust this value to control the height of the input boxes
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)' // add the box shadow effect
          }
        }
      }
    }
  });

  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    if (userInfo === null) {
      navigate('/');
    }
  }, [navigate]);

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activePgName, setActivePgName] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    navigate(e.path);
    setActivePgName(e.title);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar className="">
            <div className="d-flex justify-content-space-beetween w-100">
              <div className="d-flex w-100">
                <IconButton
                  color="#f3950d"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' })
                  }}
                >
                  <MenuIcon sx={{ color: '#f3950d' }} />
                </IconButton>
                <Typography
                  className="me-auto mt-auto mb-auto"
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ color: '#191414' }}
                >
                  {activePgName}
                </Typography>
              </div>
              <div>
                <Button variant="contained" onClick={logoutUser}>
                  Logout
                </Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            Steelsoft
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {sidebarConfig.map((list, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: '#ffebcc'
                    }
                  }}
                  onClick={() => handleClick(list)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#f3950d'
                    }}
                  >
                    {list.icon}
                  </ListItemIcon>
                  <ListItemText primary={list.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
          <DrawerHeader />
          <ThemeProvider theme={cardTheme}>
            <Card>
              <CardContent>
                <DashboardPaths />
              </CardContent>
            </Card>
          </ThemeProvider>
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;

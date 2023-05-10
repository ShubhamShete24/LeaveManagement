import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import rightArrow from '../../assets/images/right-arrow.png';
import { USER_INFO_KEY } from '../../utils/constants';
import { getAllUsersData, getRolesData } from '../../redux/actions/userDetailActions';

function Home() {
  const theme = createTheme({
    card: {
      height: 300,
      width: 300,
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    }
  });

  const useStyles = makeStyles({
    card: {
      border: '1px solid #f3950d',
      borderRadius: '10px',
      height: theme.card.height,
      width: theme.card.width,
      transition: theme.card.transition,
      '&:hover': {
        transform: theme.card['&:hover'].transform
      }
    },
    arrow: {
      right: 0,
      margin: ' 18px'
    }
  });

  const classes = useStyles();

  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));

  useEffect(() => {
    dispatch(getAllUsersData());
    if (userInfo?.user[0]?.role[0].roleName === 'ADMIN') {
      dispatch(getRolesData());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="p-5">
      <div className="p-1">
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Greetings
                  </Typography>
                  <Typography variant="body2" component="p">
                    Hello, welcome to our website!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Upcoming Holidays
                    <img src={rightArrow} alt="rightarrow" width="20px" className={classes.arrow} />
                  </Typography>
                  <Typography variant="body2" component="p">
                    Memorial Day is coming up on May 30th!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Leaves Count
                  </Typography>
                  <Typography variant="body2" component="p">
                    You have 10 leaves remaining this year.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </div>
  );
}
export default Home;

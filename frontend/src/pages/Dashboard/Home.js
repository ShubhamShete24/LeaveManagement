import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { makeStyles } from '@material-ui/core/styles';

function Home() {
  const theme = createTheme({
    card: {
      height: 500,
      width: 300,
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    }
  });

  // const useStyles = makeStyles({
  //   card: {
  //     height: theme.card.height,
  //     width: theme.card.width,
  //     transition: theme.card.transition,
  //     '&:hover': {
  //       transform: theme.card['&:hover'].transform
  //     }
  //   }
  // });

  // const classes = useStyles();
  return (
    <div className="p-5">
      <div className="p-1">
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
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
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Upcoming Holidays
                  </Typography>
                  <Typography variant="body2" component="p">
                    Memorial Day is coming up on May 30th!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
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

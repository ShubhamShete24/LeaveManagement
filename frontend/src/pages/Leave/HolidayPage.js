import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

function HolidayPage({ holidays }) {
  const useStyles = makeStyles({
    card: {
      height: 200,
      width: 300,
      marginBottom: 16,
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    },
    '@media (min-width: 600px)': {
      card: {
        height: 200,
        width: 300
      }
    },
    '@media (min-width: 960px)': {
      card: {
        height: 220,
        width: 320
      }
    },
    '@media (min-width: 375px) and (max-width: 667px)': {
      card: {
        width: 172,
        height: 161
      }
    }
  });

  const classes = useStyles();
  const getHolidaysByMonth = () => {
    const holidaysByMonth = Array.from(Array(12).keys()).map((month) => {
      const monthHolidays = holidays?.filter((holiday) => {
        const holidayMonth = new Date(`2023-${holiday.date}`).getMonth();
        return holidayMonth === month;
      });
      return {
        month: new Date(`2023-${month + 1}-01`).toLocaleString('default', { month: 'long' }),
        holidays: monthHolidays
      };
    });

    return holidaysByMonth;
  };

  return (
    <div className="p-2">
      <div className="p-1">
        <Grid container spacing={2} justifyContent="center">
          {getHolidaysByMonth()?.map((month) => (
            <Grid key={month.month} itemxs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {month.month}
              </Typography>

              {month.holidays?.length > 0 ? (
                <Card variant="outlined" className={classes.card}>
                  <CardContent>
                    {month.holidays?.map((holiday) => (
                      <Typography key={holiday.date} variant="body2" component="p">
                        {holiday.name} -{' '}
                        {new Date(`2023-${holiday.date}`).toLocaleDateString(undefined, {
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card variant="outlined" className={classes.card}>
                  <CardContent>
                    <Typography variant="body2" component="p">
                      No holiday
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
HolidayPage.propTypes = {
  holidays: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired
};

export default HolidayPage;

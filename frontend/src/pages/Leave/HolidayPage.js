import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

function HolidayPage() {
  const holidays = [
    { name: "New Year's Day", date: '01/01' },
    { name: 'Martin Luther King Jr. Day', date: '01/17' },
    { name: "President's Day", date: '02/21' },
    { name: 'Memorial Day', date: '05/30' },
    { name: 'Independence Day', date: '07/04' },
    { name: 'Labor Day', date: '09/05' },
    { name: 'Columbus Day', date: '10/10' },
    { name: 'Veterans Day', date: '11/11' },
    { name: 'Thanksgiving Day', date: '11/24' },
    { name: 'Christmas Day', date: '12/25' }
  ];

  const useStyles = makeStyles({
    card: {
      height: 200,
      width: 300,
      marginBottom: 16
    }
  });

  const classes = useStyles();
  const getHolidaysByMonth = () => {
    const holidaysByMonth = Array.from(Array(12).keys()).map((month) => {
      const monthHolidays = holidays.filter((holiday) => {
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
    <div className="p-5">
      <div className="p-1">
        <Grid container spacing={2} justifyContent="center">
          {getHolidaysByMonth().map((month) => (
            <Grid key={month.month} item xs={12} sm={4}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {month.month}
              </Typography>

              {month.holidays.length > 0 ? (
                <Card variant="outlined" className={classes.card}>
                  <CardContent>
                    {month.holidays.map((holiday) => (
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

export default HolidayPage;

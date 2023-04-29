import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';

function HolidayPage() {
  const holidays = [
    { name: "New Year's Day", date: '01/01/2023' },
    { name: 'Martin Luther King Jr. Day', date: '01/17/2023' },
    { name: "President's Day", date: '02/21/2023' },
    { name: 'Memorial Day', date: '05/30/2023' },
    { name: 'Independence Day', date: '07/04/2023' },
    { name: 'Labor Day', date: '09/05/2023' },
    { name: 'Columbus Day', date: '10/10/2023' },
    { name: 'Veterans Day', date: '11/11/2023' },
    { name: 'Thanksgiving Day', date: '11/24/2023' },
    { name: 'Christmas Day', date: '12/25/2023' }
  ];

  const useStyles = makeStyles({
    card: {
      height: 200,
      width: 300,
      marginBottom: 16
    }
  });

  const classes = useStyles();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const filteredHolidays = holidays.filter((holiday) => new Date(holiday.date).getFullYear() === selectedYear);
  const months = Array.from(new Set(filteredHolidays.map((holiday) => new Date(holiday.date).getMonth())));

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="p-5">
      <div className="p-1">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Select label="Select Year" value={selectedYear} onChange={handleChangeYear}>
              {[...new Array(10)].map((_, index) => (
                <MenuItem key={index} value={new Date().getFullYear() + index}>
                  {new Date().getFullYear() + index}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {months?.map((month) => (
            <Grid key={month} item xs={12} sm={4}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {new Date(
                  filteredHolidays.find((holiday) => new Date(holiday.date).getMonth() === month).date
                ).toLocaleString('default', { month: 'long' })}
              </Typography>
              {filteredHolidays
                .filter((holiday) => new Date(holiday.date).getMonth() === month)
                ?.map((holiday) => (
                  <Card key={holiday.date} variant="outlined" className={classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {holiday.name}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {new Date(holiday.date).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default HolidayPage;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Grid,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import { createHoliday } from '../../services/HolidayService';
import { CreateHolidays } from '../../redux/actions/holidayActions';
import { API_RESPONSE_CODES } from '../../utils/constants';

function HolidayForm() {
  const dispatch = useDispatch();
  const [holidays, setHolidays] = useState([]);
  const [payload, setPayload] = useState({
    year: '',
    holidayList: []
  });
  const [newHolidayName, setNewHolidayName] = useState('');
  const [newHolidayDate, setNewHolidayDate] = useState(null);
  // const addHoliday = useSelector((state) => state.createholidays.holidays);

  const handleAddHoliday = (event) => {
    event.preventDefault();
    if (newHolidayName && newHolidayDate) {
      setPayload({ ...payload, holidayList: [...payload.holidayList, { name: newHolidayName, date: newHolidayDate }] });
      setHolidays([...holidays, { name: newHolidayName, date: newHolidayDate }]);
      setNewHolidayName('');
      setNewHolidayDate(null);
    }
  };
  console.log('payload is', payload);

  const handleDeleteHoliday = (index) => {
    const updatedHolidays = holidays.filter((holiday, i) => i !== index);
    setHolidays(updatedHolidays);
  };

  const handleShowHolidays = () => {
    // Pass holidays data to HolidayPage component
    // You can perform any other logic here if needed
    // Dispatch createHoliday action here with the holidays data
    const currentYear = new Date().getFullYear(); // Get the current year
    const holidaysWithYear = holidays.map((holiday) => ({
      ...holiday,
      year: currentYear
    }));
    dispatch(CreateHolidays(holidaysWithYear));
    console.log(holidaysWithYear);
  };

  return (
    <div>
      <Container>
        <form onSubmit={handleAddHoliday}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                label="Holiday Name"
                fullWidth
                value={newHolidayName}
                onChange={(event) => setNewHolidayName(event.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <DatePicker
                label="Holiday Date"
                value={newHolidayDate}
                onChange={(date) => setNewHolidayDate(date)}
                fullWidth
                inputFormat="dd/MM/yyyy"
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton variant="contained" color="primary" type="submit">
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" color="primary" onClick={handleShowHolidays}>
                Save Holidays
              </Button>
            </Grid>
          </Grid>
        </form>
        <br />
        <br />
        <List>
          {holidays?.map((holiday, index) => (
            <ListItem key={index}>
              <ListItemText primary={holiday.name} secondary={new Date(holiday.date).toLocaleDateString()} />
              <ListItemSecondaryAction>
                <Button onClick={() => handleDeleteHoliday(index)}>Delete</Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default HolidayForm;

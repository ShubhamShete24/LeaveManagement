import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button
} from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { GetLeaveTypes, ApplyForLeaves } from '../redux/actions/leaveActions';
import { GetAllHolidays } from '../redux/actions/holidayActions';
// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     secondary: {
//       main: '#00cc00' // set the secondary color to green
//     }
//   },
//   overrides: {
//     MuiCard: {
//       root: {
//         transition: 'box-shadow 0.3s ease-in-out',
//         '&:hover': {
//           boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'
//         }
//       }
//     }
//   }
// });

function Leaves(props) {
  const [leaveApplication, setLeaveApplication] = useState({
    userId: props?.data?.userId,
    fromDate: dayjs(),
    toDate: dayjs(),
    leaveTypeId: '',
    fromSession: '',
    toSession: '',
    leaveCount: 0,
    reportingManagerId: props?.data?.reportingManagerId
  });
  const dispatch = useDispatch();
  const leaveTypes = useSelector((state) => state.GetLeaveTypesReducer.leaveTypes);
  const holidays = useSelector((state) => state.GetHolidaysReducer.holidays);
  const { leavesApplied, leaveAppliedMessage } = useSelector((state) => ({
    leavesApplied: state.ApplyForLeavesReducer.leavesApplied,
    leaveAppliedMessage: state.ApplyForLeavesReducer.leaveAppliedMessage
  }));

  useEffect(() => {
    if (leaveTypes === undefined || leaveTypes.length === 0) {
      dispatch(GetLeaveTypes());
    }
    if (holidays === undefined || holidays.length === 0) {
      dispatch(GetAllHolidays());
    }
  }, [dispatch, leaveTypes, holidays, leaveApplication]);
  const calculateLeaveDays = (fromDate, toDate) => {
    const toDate1 = dayjs(toDate);
    const fromDate1 = dayjs(fromDate);
    let diff = toDate1.diff(fromDate, 'days');
    let holidayCount = 0;
    for (let day = 0; day <= diff; day += 1) {
      const dayAdded = fromDate1.add(day, 'day');
      if (
        dayAdded.get('d') === 0 ||
        holidays.filter((holiday) => dayjs(holiday.date).isSame(dayAdded, 'day')).length === 1
      ) {
        holidayCount += 1;
      }
    }
    diff += 1;
    if (leaveApplication.fromSession === 'morning' || leaveApplication.fromSession === 'afternoon') {
      diff -= 0.5;
    }
    if (leaveApplication.toSession === 'morning' || leaveApplication.toSession === 'afternoon') {
      diff -= 0.5;
    }
    diff -= holidayCount;
    return diff;
  };

  const handleChange = (changeEvent) => {
    const { name, value } = changeEvent.target;
    setLeaveApplication({ ...leaveApplication, [name]: value });
  };
  const handleFromDateChange = (date) => {
    setLeaveApplication({ ...leaveApplication, fromDate: date.format('YYYY-MM-DD').toLocaleString() });
  };
  const handleToDateChange = (date) => {
    setLeaveApplication({ ...leaveApplication, toDate: date.format('YYYY-MM-DD').toLocaleString() });
  };
  const updateLeaveCount = (leaveCount) => {
    setLeaveApplication({ ...leaveApplication, leaveCount });
  };
  const [shouldSubmitForm, setShouldSubmitForm] = useState(false);
  useEffect(() => {
    if (shouldSubmitForm) {
      console.log(leaveApplication);
      dispatch(ApplyForLeaves(leaveApplication));
    }
    console.log(leavesApplied);
    if (leavesApplied !== undefined && leaveAppliedMessage !== '') {
      alert(leaveAppliedMessage);
    }
    setShouldSubmitForm(false);
  }, [leaveApplication, shouldSubmitForm, dispatch, leavesApplied, leaveAppliedMessage]);

  const handleLeaveApplication = (e) => {
    e.preventDefault();
    const leaveCount = calculateLeaveDays(leaveApplication.fromDate, leaveApplication.toDate);
    updateLeaveCount(leaveCount);
    console.log(props?.data?.reportingManagerId);
    setShouldSubmitForm(true);
  };
  return (
    <div className="p-2">
      <div className="p-1">
        <Card>
          {props?.data?.reportingManagerId === undefined ? (
            <Typography style={{ color: 'red' }} sx={{ fontSize: 13 }} margin={3} color="text.secondary">
              You cannot apply for leaves untill you have manager assigned!
            </Typography>
          ) : null}
          <Typography sx={{ fontSize: 30 }} margin={3} color="text.secondary">
            Leave application
          </Typography>
          <CardContent>
            <form noValidate autoComplete="off" onSubmit={handleLeaveApplication}>
              <Grid container spacing={2}>
                {/* Leave type */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="leave-type-label">Leave Type</InputLabel>
                    <Select
                      labelId="leave-type-label"
                      id="leave-type-select"
                      name="leaveTypeId"
                      onChange={handleChange}
                      label="Leave Type"
                    >
                      {leaveTypes ? (
                        leaveTypes?.map((element) => (
                          <MenuItem key={`l${element._id}`} value={element._id}>
                            {element?.leaveType}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>no leavetypes available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} />
                {/* From date (using @mui/x-date-pickers library) */}
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    name="fromDate"
                    defaultValue={dayjs(new Date().toLocaleString())}
                    label="From date"
                    className="width-100"
                    format="DD-MM-YYYY"
                    onChange={handleFromDateChange}
                  />
                </Grid>
                {/* From Session */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="from-session-label">From Session</InputLabel>
                    <Select
                      labelId="from-session-label"
                      id="from-session-select"
                      onChange={handleChange}
                      name="fromSession"
                      label="From Session"
                    >
                      <MenuItem value="morning">Morning</MenuItem>
                      <MenuItem value="afternoon">Afternoon</MenuItem>
                      <MenuItem value="both">Both</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* To date (using @mui/x-date-pickers library) */}
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    name="toDate"
                    defaultValue={dayjs(new Date().toLocaleString())}
                    className="width-100"
                    label="To date"
                    format="DD-MM-YYYY"
                    onChange={handleToDateChange}
                  />
                </Grid>
                {/* To Session */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="to-session-label">To Session</InputLabel>
                    <Select
                      labelId="to-session-label"
                      id="to-session-select"
                      name="toSession"
                      onChange={handleChange}
                      label="To Session"
                    >
                      <MenuItem value="morning">Morning</MenuItem>
                      <MenuItem value="afternoon">Afternoon</MenuItem>
                      <MenuItem value="both">both</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* Should come from database */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="leaveCount"
                    label="Leave Count"
                    fullWidth
                    variant="outlined"
                    type="number"
                    required
                  />
                </Grid>
                <input type="hidden" name="" value="" />
                {/* Reason */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="reason-label">Reason</InputLabel>
                    <Select
                      labelId="reason-label"
                      id="reason-select"
                      onChange={handleChange}
                      label="Reason"
                      name="reason"
                    >
                      <MenuItem value="illness">Illness</MenuItem>
                      <MenuItem value="family">Family Emergency</MenuItem>
                      <MenuItem value="personal">Personal</MenuItem>
                      <MenuItem value="vacation">Vacation</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} className="d-flex justify-content-end">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={props?.data?.reportingManagerId === undefined}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        {/* <ThemeProvider theme={theme}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField name="UserID" label="UserID" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="Leave" label="Leave Type" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="reason" label="Reason for leave" fullWidth multiline rows={4} />
                </Grid>
               
              </Grid>
            </CardContent>
          </Card>
        </ThemeProvider> */}
      </div>
    </div>
  );
}

export default Leaves;

Leaves.propTypes = {
  data: PropTypes.shape({
    userId: PropTypes.string,
    reportingManagerId: PropTypes.string
  })
};

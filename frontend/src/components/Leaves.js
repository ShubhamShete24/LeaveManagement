import React, { useCallback, useEffect, useState } from 'react';
import {
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Snackbar,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GetLeaveTypes, ApplyForLeaves, GetLeaveBalances } from '../redux/actions/leaveActions';
import { GetAllHolidays } from '../redux/actions/holidayActions';
import { USER_INFO_KEY } from '../utils/constants';
import { GetUsersBasedOnCondition } from '../redux/actions/userDetailActions';

function Leaves() {
  // styling of the form
  const theme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: '47px',
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
  const sessionData = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  const [leaveApplication, setLeaveApplication] = useState({
    userId: sessionData?.user[0]?._id,
    fromDate: dayjs(),
    toDate: dayjs(),
    leaveTypeId: '',
    fromSession: '',
    toSession: '',
    leaveCount: 0,
    reason: '',
    status: 3, // pending. Need to use enum or use anything that should prevent hardcoding
    reportingManagerIds: []
  });
  const dispatch = useDispatch();
  const leaveTypes = useSelector((state) => state.GetLeaveTypesReducer.leaveTypes);
  const holidays = useSelector((state) => state.GetHolidaysReducer.holidays);
  const managers = useSelector((state) => state.UserDetailReducers.usersBasedOnCondition);
  const leaveBalances = useSelector((state) => state.GetLeaveBalancesReducer.leaveBalances);
  const { leavesApplied, leaveAppliedMessage } = useSelector((state) => ({
    leavesApplied: state.ApplyForLeavesReducer.leavesApplied,
    leaveAppliedMessage: state.ApplyForLeavesReducer.leaveAppliedMessage
  }));
  const [shouldSubmitForm, setShouldSubmitForm] = useState(false);
  const [selectedManagers, setSelectedManager] = useState([]);
  const [leaveCount, setLeaveCount] = useState(0);
  const [existingLeaveBalance, setExistingLeaveBalance] = useState(0);
  const [isLeaveTypeSelected, setIsLeaveTypeSelected] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const calculateLeaveDays = useCallback(
    (fromDate, toDate) => {
      const toDate1 = dayjs(toDate);
      const fromDate1 = dayjs(fromDate);
      let diff = toDate1.diff(fromDate, 'days');
      if (diff < 0) {
        return 0;
      }
      let holidayCount = 0;
      for (let day = 0; day <= diff; day += 1) {
        const dayAdded = fromDate1.add(day, 'day');
        if (
          dayAdded.get('d') === 0 ||
          holidays?.filter((holiday) => dayjs(holiday.date).isSame(dayAdded, 'day')).length === 1
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
    },
    [holidays, leaveApplication.fromSession, leaveApplication.toSession]
  );

  useEffect(() => {
    if (leaveTypes === undefined || leaveTypes.length === 0) {
      dispatch(GetLeaveTypes());
    }
    if (holidays === undefined || holidays?.length === 0) {
      dispatch(GetAllHolidays());
    }
    if (managers === undefined || managers.length === 0) {
      dispatch(
        GetUsersBasedOnCondition({
          attribute: 'role',
          value: 'MANAGER'
        })
      );
    }
    if (leaveBalances === undefined || leaveBalances.length === 0) {
      dispatch(GetLeaveBalances(sessionData?.user[0]?._id));
    }
    if (shouldSubmitForm) {
      console.log(leaveApplication);
      const fromDate = dayjs(leaveApplication?.fromDate);
      const toDate = dayjs(leaveApplication?.toDate);
      if (fromDate.isAfter(toDate)) {
        setSnackBarOpen(true);
        setSnackBarMessage('You cannot have from date after to date');
      } else {
        dispatch(ApplyForLeaves(leaveApplication));
      }
    }
    if (leavesApplied !== undefined && leaveAppliedMessage !== '') {
      alert(leaveAppliedMessage);
    }
    setLeaveCount(calculateLeaveDays(leaveApplication.fromDate, leaveApplication.toDate));
    if (isLeaveTypeSelected) {
      setExistingLeaveBalance(
        leaveBalances?.find((elem) => elem.leaveTypeId === leaveApplication.leaveTypeId)?.leaveBalance
      );
    }
    setIsLeaveTypeSelected(false);
    setShouldSubmitForm(false);
    // Here a problem was being faced regarding infinite loop when session?.user was added as dependency
    // hence eslint was disabled here. Any solution to problem is welcome
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    leaveTypes,
    holidays,
    leaveApplication,
    managers,
    shouldSubmitForm,
    leavesApplied,
    leaveAppliedMessage,
    selectedManagers,
    leaveCount,
    leaveBalances,
    setLeaveCount,
    calculateLeaveDays,
    existingLeaveBalance,
    isLeaveTypeSelected
  ]);
  const handleOnChangeSelectManager = (val) => {
    setSelectedManager(val);
  };
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  const handleChange = (changeEvent) => {
    const { name, value } = changeEvent.target;
    if (name === 'leaveTypeId') {
      setIsLeaveTypeSelected(true);
    }
    setLeaveApplication({ ...leaveApplication, [name]: value });
  };
  const handleFromDateChange = (date) => {
    setLeaveApplication({ ...leaveApplication, fromDate: date.format('YYYY-MM-DD').toLocaleString() });
  };
  const handleToDateChange = (date) => {
    setLeaveApplication({ ...leaveApplication, toDate: date.format('YYYY-MM-DD').toLocaleString() });
  };
  const updateLeaveApplicationWithLeaveCountAndReportingManagerIds = (leaveCount, managerIds) => {
    setLeaveApplication({ ...leaveApplication, leaveCount, reportingManagerIds: managerIds });
  };

  const handleLeaveApplication = (e) => {
    e.preventDefault();
    const leaveCount = calculateLeaveDays(leaveApplication.fromDate, leaveApplication.toDate);
    const managerIds = selectedManagers.map((manager) => manager._id);
    if (managerIds.indexOf(sessionData?.user[0]?.reportingManager) === -1) {
      managerIds.push(sessionData?.user[0]?.reportingManager);
    }
    updateLeaveApplicationWithLeaveCountAndReportingManagerIds(leaveCount, managerIds);
    setShouldSubmitForm(true);
  };
  const excludeDefaulReportingManager = (options) =>
    options.filter((option) => option._id !== sessionData?.user[0]?.reportingManager);
  return (
    <div className="p-2">
      <div className="p-1">
        <ThemeProvider theme={theme}>
          {sessionData?.user[0]?.reportingManager === undefined ? (
            <Typography style={{ color: 'red' }} sx={{ fontSize: 13 }} margin={3} color="text.secondary">
              You cannot apply for leaves untill you have manager assigned!
            </Typography>
          ) : null}
          <Typography sx={{ fontSize: 30 }} margin={3} color="text.secondary">
            Leave application
          </Typography>
          <Typography style={{ color: 'steelblue' }} sx={{ fontSize: 15 }} margin={3} color="text.secondary">
            Your leave application will be by default sent to your default reporting manager -
            <span style={{ color: 'brown', fontWeight: 'bold', letterSpacing: '2px', fontSize: '1rem' }}>
              {managers?.find((manager) => manager?._id === sessionData?.user[0]?.reportingManager)?.name}
            </span>
          </Typography>
          <CardContent>
            <form noValidate autoComplete="off" onSubmit={handleLeaveApplication}>
              {/* Should be updated as soon as toDate is selected */}
              <Grid container xs={6} sm={6}>
                <Grid item xs={2} sm={5}>
                  <TextField
                    disabled
                    name="leaveCount"
                    label="Selected leave type balance"
                    fullWidth
                    variant="outlined"
                    type="number"
                    value={existingLeaveBalance}
                  />
                </Grid>
                <Grid item xs={2} sm={5} mx={1}>
                  <TextField
                    disabled
                    name="leaveCount"
                    label="Leave Count"
                    fullWidth
                    variant="outlined"
                    type="number"
                    required
                    value={leaveCount}
                  />
                </Grid>
              </Grid>
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
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    onChange={(event, value) => handleOnChangeSelectManager(value)}
                    multiple
                    id="tags-outlined"
                    options={managers}
                    getOptionLabel={(option) => option?.name}
                    filterSelectedOptions
                    filterOptions={excludeDefaulReportingManager}
                    renderInput={(params) => <TextField {...params} label="CC" placeholder="Substitute manager" />}
                  />
                </Grid>
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

                {/* Reason */}
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="reason"
                    label="Reason"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12} className="d-flex justify-content-end">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={sessionData?.user[0]?.reportingManager === undefined}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </ThemeProvider>
      </div>
      <Snackbar
        open={snackBarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        message={snackBarMessage}
        onClose={handleSnackBarClose}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackBarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

export default Leaves;

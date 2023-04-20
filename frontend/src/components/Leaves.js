import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#00cc00' // set the secondary color to green
    }
  },
  overrides: {
    MuiCard: {
      root: {
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'
        }
      }
    }
  }
});
function LeavePage() {
  const [leaveType, setLeaveType] = useState('');
  const [fromSession, setFromSession] = useState('');
  const [toSession, setToSession] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const handleFromSessionChange = (event) => {
    setFromSession(event.target.value);
  };

  const handleToSessionChange = (event) => {
    setToSession(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="p-5">
      <div className="p-1">
        <Card>
          <CardContent>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField name="userID" label="User ID" fullWidth variant="outlined" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="leave-type-label">Leave Type</InputLabel>
                    <Select
                      labelId="leave-type-label"
                      id="leave-type-select"
                      value={leaveType}
                      onChange={handleLeaveTypeChange}
                      label="Leave Type"
                    >
                      <MenuItem value="annual">Annual</MenuItem>
                      <MenuItem value="sick">Sick</MenuItem>
                      <MenuItem value="casual">Casual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="fromDate" label="From Date" fullWidth variant="outlined" type="date" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="from-session-label">From Session</InputLabel>
                    <Select
                      labelId="from-session-label"
                      id="from-session-select"
                      value={fromSession}
                      onChange={handleFromSessionChange}
                      label="From Session"
                    >
                      <MenuItem value="morning">Morning</MenuItem>
                      <MenuItem value="afternoon">Afternoon</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="toDate" label="End Date" fullWidth variant="outlined" type="date" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="to-session-label">To Session</InputLabel>
                    <Select
                      labelId="to-session-label"
                      id="to-session-select"
                      value={toSession}
                      onChange={handleToSessionChange}
                      label="To Session"
                    >
                      <MenuItem value="morning">Morning</MenuItem>
                      <MenuItem value="afternoon">Afternoon</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
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
                <Grid item xs={12} sm={6}>
                  <TextField name="reportingManager" label="Reporting Manager" fullWidth variant="outlined" required />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" required>
                      <InputLabel id="reason-label">Reason</InputLabel>
                      <Select
                        labelId="reason-label"
                        id="reason-select"
                        value={reason}
                        onChange={handleReasonChange}
                        label="Reason"
                      >
                        <MenuItem value="illness">Illness</MenuItem>
                        <MenuItem value="family">Family Emergency</MenuItem>
                        <MenuItem value="personal">Personal</MenuItem>
                        <MenuItem value="vacation">Vacation</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="reason-attachment-input">Reason Attachment</InputLabel>
                      <OutlinedInput
                        id="reason-attachment-input"
                        type="file"
                        // onChange={handleAttachmentChange}
                        // endAdornment={
                        //   <InputAdornment position="end">
                        //     <IconButton onClick={handleAttachmentClear} edge="end">
                        //       <ClearIcon />
                        //     </IconButton>
                        //   </InputAdornment>
                        // }
                        label="Reason Attachment"
                      />
                    </FormControl>
                  </Grid> */}
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" required>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        id="status-select"
                        value={status}
                        onChange={handleStatusChange}
                        label="Status"
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
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
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </ThemeProvider> */}
      </div>
    </div>
  );
}

export default LeavePage;

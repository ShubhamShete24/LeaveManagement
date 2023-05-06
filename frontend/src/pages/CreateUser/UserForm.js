import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Grid, Button, MenuItem, Typography, CardContent } from '@mui/material';

function UserForm() {
  const allRoles = useSelector((state) => state.UserDetailReducers?.allRoles);
  const allUsers = useSelector((state) => state.UserDetailReducers?.allUsers);
  const [status, setStatus] = useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <CardContent>
        <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
          User Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField name="userName" label="User Name" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="mobileNumber" label="Mobile Number" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="email" label="Email" fullWidth variant="outlined" type="email" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="password" label="Password" fullWidth variant="outlined" type="password" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="gender" label="Gender" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="employeeID" label="Employee ID" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="reportingManager" label="Reporting Manager" fullWidth variant="outlined" select required>
              <MenuItem value="Name">Name</MenuItem>
              <MenuItem value="Manageer">Manageer</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="status"
              label="Status"
              select
              fullWidth
              variant="outlined"
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} marginTop={3} className="d-flex justify-content-end">
          <Button variant="contained" color="primary">
            Save
          </Button>
        </Grid>
      </CardContent>
    </div>
  );
}

export default UserForm;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Grid, Button, MenuItem, Typography, CardContent, Autocomplete } from '@mui/material';
import { GetUsersBasedOnCondition } from '../../redux/actions/userDetailActions';

function UserForm() {
  // const allRoles = useSelector((state) => state.UserDetailReducers?.allRoles);
  // const allUsers = useSelector((state) => state.UserDetailReducers?.allUsers);
  const [status, setStatus] = useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const dispatch = useDispatch();
  const managers = useSelector((state) => state.UserDetailReducers.usersBasedOnCondition);
  const [selectedManagers, setSelectedManager] = useState([]);
  const handleOnChangeSelectManager = (val) => {
    setSelectedManager(val);
  };
  useEffect(() => {
    console.log(selectedManagers);
    if (managers === undefined || managers.length === 0) {
      console.log('inside use effect');
      dispatch(
        GetUsersBasedOnCondition({
          attribute: 'role',
          value: 'MANAGER'
        })
      );
    }
  }, [dispatch, managers, selectedManagers]);

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
            <Autocomplete
              onChange={(event, value) => handleOnChangeSelectManager(value)}
              multiple={false}
              id="tags-outlined"
              options={managers}
              getOptionLabel={(option) => option?.name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="CC" placeholder="Substitute manager" />}
            />
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

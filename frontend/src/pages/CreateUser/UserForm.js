import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Grid,
  Button,
  MenuItem,
  Typography,
  CardContent,
  Autocomplete,
  InputAdornment
} from '@mui/material';
import { GetUsersBasedOnCondition } from '../../redux/actions/userDetailActions';
import { createUser } from '../../services/UserCreation';
import { API_RESPONSE_CODES } from '../../utils/constants';

function UserForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const managers = useSelector((state) => state.UserDetailReducers.usersBasedOnCondition);
  const allRoles = useSelector((state) => state.UserDetailReducers?.allRoles);

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [status, setStatus] = useState('');
  const [selectedMangerId, setSelectedMangerId] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState('');

  const handelSave = async () => {
    const payload = {
      name,
      email,
      password,
      mobileNumber,
      gender,
      employeeId,
      reportingManager: selectedMangerId,
      role: selectedRoleId,
      status
    };

    const createUserResult = await createUser(payload);
    if (createUserResult.status === API_RESPONSE_CODES.SUCCESS_CREATE) {
      const userInfo = {
        userId: createUserResult.data.data._id,
        name: createUserResult.data.data.name,
        employeeId: createUserResult.data.data.employeeId
      };
      navigate('/dashboard/personal-info', { state: { userInfo } });
    }
  };

  useEffect(() => {
    if (managers === undefined || managers.length === 0) {
      dispatch(
        GetUsersBasedOnCondition({
          attribute: 'role',
          value: 'MANAGER'
        })
      );
    }
  }, [dispatch, managers]);

  return (
    <div>
      <CardContent>
        <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
          User Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="userName"
              label="User Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="mobileNumber"
              label="Mobile Number"
              variant="outlined"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              InputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]{10}',
                startAdornment: <InputAdornment position="start">+91</InputAdornment>
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="gender"
              label="Gender"
              variant="outlined"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              fullWidth
              select
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="employeeID"
              label="Employee ID"
              variant="outlined"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              onChange={(event, value) => setSelectedMangerId(value?._id)}
              multiple={false}
              id="tags-outlined"
              options={managers}
              getOptionLabel={(option) => option?.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Reporting Manager" placeholder="Reporting Manager" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="status"
              label="Status"
              variant="outlined"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              select
              fullWidth
              required
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="role"
              label="Role"
              variant="outlined"
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              fullWidth
              select
              required
            >
              {allRoles?.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} marginTop={3} className="d-flex justify-content-end">
          <Button
            disabled={
              !name ||
              !mobileNumber ||
              !email ||
              !password ||
              !gender ||
              !employeeId ||
              !selectedMangerId ||
              !status ||
              !selectedRoleId
            }
            variant="contained"
            color="primary"
            onClick={handelSave}
          >
            Create User
          </Button>
        </Grid>
      </CardContent>
    </div>
  );
}

export default UserForm;

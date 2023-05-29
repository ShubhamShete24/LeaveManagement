import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GetUsersBasedOnCondition, getRolesData } from '../../redux/actions/userDetailActions';
import { createUser } from '../../services/UserCreation';
import { API_RESPONSE_CODES } from '../../utils/constants';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        label: {
          // Add your label text styles here
          color: 'red',
          fontSize: '14px'
        }
      }
    }
  }
});

function UserForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = location.state;
  const userEditData = data?.userInfo;

  const managers = useSelector((state) => state.UserDetailReducers.usersBasedOnCondition);
  const allRoles = useSelector((state) => state.UserDetailReducers?.allRoles);

  const [payload, setPayload] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
    gender: '',
    employeeId: '',
    status: '',
    reportingManager: '',
    role: ''
  });

  const handelSave = async () => {
    if (!data?.isEdit) {
      const createUserResult = await createUser(payload);
      if (createUserResult.status === API_RESPONSE_CODES.SUCCESS_CREATE) {
        const userInfo = {
          userId: createUserResult.data.data._id,
          name: createUserResult.data.data.name,
          employeeId: createUserResult.data.data.employeeId
        };
        navigate('/dashboard/personal-info', { state: { userInfo } });
      }
    } else {
      navigate('/dashboard/user');
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

  useEffect(() => {
    if (data?.isEdit) {
      setPayload({
        name: userEditData.name,
        mobileNumber: userEditData.mobileNumber,
        email: userEditData.email,
        gender: userEditData.gender,
        employeeId: userEditData.employeeId,
        reportingManager: userEditData.reportingManager._id,
        status: userEditData.status,
        role: userEditData.role._id
      });
    }
  }, []);

  useEffect(() => {
    dispatch(getRolesData());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CardContent>
          <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
            User Details
          </Typography>
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                name="userName"
                label="User Name"
                variant="outlined"
                value={payload.name}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    name: e.target.value
                  })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="mobileNumber"
                label="Mobile Number"
                variant="outlined"
                value={payload.mobileNumber}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    mobileNumber: e.target.value
                  })
                }
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
                value={payload.email}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    email: e.target.value
                  })
                }
                fullWidth
                required
              />
            </Grid>
            {!data?.isEdit ? (
              <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={payload.password}
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      password: e.target.value
                    })
                  }
                  fullWidth
                  required
                />
              </Grid>
            ) : null}
            <Grid item xs={12} sm={6}>
              <TextField
                name="gender"
                label="Gender"
                variant="outlined"
                value={payload.gender}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    gender: e.target.value
                  })
                }
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
                value={payload.employeeId}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    employeeId: e.target.value
                  })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple={false}
                id="tags-outlined"
                options={managers}
                getOptionLabel={(option) => option?.name}
                filterSelectedOptions
                value={managers.find((manager) => manager._id === payload.reportingManager) || null}
                onChange={(e, value) =>
                  setPayload({
                    ...payload,
                    reportingManager: value?._id
                  })
                }
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
                value={payload.status}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    status: e.target.value
                  })
                }
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
                value={allRoles.some((role) => role._id === payload.role) ? payload.role : ''}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    role: e.target.value
                  })
                }
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
                !payload.name ||
                !payload.mobileNumber ||
                !payload.email ||
                (!data?.isEdit && !payload.password) ||
                !payload.gender ||
                !payload.employeeId ||
                !payload.reportingManager ||
                !payload.status ||
                !payload.role
              }
              variant="contained"
              color="primary"
              onClick={handelSave}
            >
              {!data?.isEdit ? 'Create User' : 'Save'}
            </Button>
          </Grid>
        </CardContent>
      </div>
    </ThemeProvider>
  );
}

export default UserForm;

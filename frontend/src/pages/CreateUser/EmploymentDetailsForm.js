import React, { useEffect, useState } from 'react';
import { CardContent, Grid, TextField, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { createEmploymentDetails, updateEmploymentDetails } from '../../services/UserCreation';
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
function EmploymentDetailsForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const editUserData = data?.userInfo?.employmentDetails;

  const [payload, setPayload] = useState({
    joiningDate: '',
    department: '',
    designation: '',
    project: '',
    employeeType: ''
  });

  const handleSave = async () => {
    if (!data?.isEdit) {
      payload.userId = data?.userInfo?.userId;
      const createEmploymentDetailResult = await createEmploymentDetails(payload);
      if (createEmploymentDetailResult.status === API_RESPONSE_CODES.SUCCESS_CREATE) {
        navigate('/dashboard/user');
      }
    } else {
      payload._id = editUserData._id;
      const updateEmploymentDetailResult = await updateEmploymentDetails(payload);
      if (updateEmploymentDetailResult.status === API_RESPONSE_CODES.SUCCESS) {
        navigate('/dashboard/user');
      }
    }
  };

  useEffect(() => {
    if (data?.isEdit) {
      setPayload({
        joiningDate: dayjs(editUserData.joiningDate).format('YYYY-MM-DD'),
        department: editUserData.department,
        designation: editUserData.designation,
        project: editUserData.project,
        employeeType: editUserData.employeeType
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CardContent>
          <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
            Employment Details
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} alignItems="center">
              <TextField
                name="userName"
                label="Name"
                fullWidth
                variant="outlined"
                value={data?.userInfo?.name}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} alignItems="center">
              <TextField
                name="employeeId"
                label="Employee Id"
                variant="outlined"
                value={data?.userInfo?.employeeId}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} alignItems="center">
              <TextField
                name="joiningDate"
                label="Joining Date"
                type="date"
                variant="outlined"
                value={payload.joiningDate}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    joiningDate: e.target.value
                  })
                }
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="department"
                label="Department"
                variant="outlined"
                value={payload.department}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    department: e.target.value
                  })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="designation"
                label="Designation"
                variant="outlined"
                value={payload.designation}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    designation: e.target.value
                  })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="project"
                label="Project"
                variant="outlined"
                value={payload.project}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    project: e.target.value
                  })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="employeeType"
                label="Employee Type"
                variant="outlined"
                value={payload.employeeType}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    employeeType: e.target.value
                  })
                }
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} marginTop={3} className="d-flex justify-content-end">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </CardContent>
      </div>
    </ThemeProvider>
  );
}

export default EmploymentDetailsForm;

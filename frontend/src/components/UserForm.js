import React, { useState } from 'react';
import { Card, CardContent, TextField, Grid, Button, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function UserForm() {
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

  const [status, setStatus] = useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="p-5">
      <div className="p-1">
        <ThemeProvider theme={theme}>
          <Card>
            <CardContent>
              <form noValidate autoComplete="off">
                <Grid container spacing={2}>
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
                    <TextField
                      name="reportingManager"
                      label="Reporting Manager"
                      fullWidth
                      variant="outlined"
                      select
                      required
                    >
                      <MenuItem value="Name">Name</MenuItem>
                      <MenuItem value="Manageer">Manageer</MenuItem>
                    </TextField>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                  <TextField name="roleID" label="Role ID" fullWidth variant="outlined" required />
                </Grid> */}
                  {/* <Grid item xs={12} sm={6}>
                  <TextField
                    name="personalDetailsID"
                    label="Personal Details ID"
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid> */}
                  {/* <Grid item xs={12} sm={6}>
                  <TextField
                    name="employmentDetailsID"
                    label="Employment Details ID"
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid> */}
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
                  <Grid item xs={12} sm={12} className="d-flex justify-content-end">
                    <Button variant="contained" color="primary">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default UserForm;

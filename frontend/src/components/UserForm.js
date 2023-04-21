import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

function UserForm() {
  return (
    <div className="p-5">
      <div className="p-1">
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
                  <TextField name="reportingManager" label="Reporting Manager" fullWidth variant="outlined" required />
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
                  <TextField name="status" label="Status" fullWidth variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserForm;

import React from 'react';
import { CardContent, Grid, TextField, Typography, Button } from '@mui/material';

function EmploymentDetailsForm() {
  return (
    <div>
      <CardContent>
        <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
          Employment Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} alignItems="center">
            <TextField fullWidth label="Full Name" required />
          </Grid>
          <Grid item xs={12} sm={6} alignItems="center">
            <TextField
              name="joiningDate"
              label="Joining Date"
              fullWidth
              variant="outlined"
              required
              type="date"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="department" label="Department" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="designation" label="Designation" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="project" label="Project" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="employeeType" label="Employee Type" fullWidth variant="outlined" required />
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

export default EmploymentDetailsForm;

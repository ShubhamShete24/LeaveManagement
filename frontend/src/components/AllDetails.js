import React from 'react';
import { Card, CardContent, Grid, TextField } from '@mui/material';

function AllDetails() {
  return (
    <div>
      <form noValidate autoComplete="off">
        {/* Employment Details */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
                  <TextField name="department" label="Department" fullWidth variant="outlined" required />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField name="designation" label="Designation" fullWidth variant="outlined" required />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField name="project" label="Project" fullWidth variant="outlined" required />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField name="employeeType" label="Employee Type" fullWidth variant="outlined" required />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid container spacing={2}>
          {/* Bank Details */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField name="bankName" label="Bank Name" fullWidth variant="outlined" required />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField name="accountNumber" label="Account Number" fullWidth variant="outlined" required />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField name="ifscCode" label="IFSC Code" fullWidth variant="outlined" required />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField name="branch" label="Branch" fullWidth variant="outlined" required />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField name="accountType" label="Account Type" fullWidth variant="outlined" required />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Education Details */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField name="degree" label="Degree" fullWidth variant="outlined" required />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField name="duration" label="Duration" fullWidth variant="outlined" required />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField name="institute" label="Institute" fullWidth variant="outlined" required />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AllDetails;

import React from 'react';
import { Card, CardContent, TextField, Grid, InputAdornment, Button } from '@mui/material';

function PersonalDetails() {
  return (
    <div className="p-5">
      <div className="p-1">
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Address" required multiline rows={3} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Nationality" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Blood Group" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  required
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Marital Status"
                  select
                  SelectProps={{
                    native: true
                  }}
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Marriage Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Father Name" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Emergency Contact (Name)"
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Emergency Contact (No)" type="tel" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Aadhaar Number"
                  required
                  InputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]{12}'
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PAN"
                  required
                  InputProps={{
                    inputMode: 'text',
                    pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}'
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Physically Challenged"
                  select
                  SelectProps={{
                    native: true
                  }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PersonalDetails;

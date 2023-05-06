import React from 'react';
import { CardContent, TextField, Grid, InputAdornment, Button, MenuItem, Typography } from '@mui/material';

function PersonalDetailsForm() {
  return (
    <div>
      <CardContent>
        <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
          Personal Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} alignItems="center">
            <TextField fullWidth label="Full Name" required />
          </Grid>
          <Grid item xs={12} sm={6} alignItems="center">
            <TextField fullWidth label="Address" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nationality" select required>
              <MenuItem value="Indian">Indian</MenuItem>
              <MenuItem value="American">American</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Father's Name" required />
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
            <TextField fullWidth label="Marital Status" select>
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
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
            <TextField fullWidth label="Emergency Contact (Name)" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Emergency Contact"
              type="tel"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">+91</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Blood Group" required />
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
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </TextField>
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
              label="Aadhaar Number"
              required
              InputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]{12}'
              }}
            />
          </Grid>
        </Grid>

        {/* Bank Details  */}
        <Typography sx={{ fontSize: 27 }} margin="16px 16px 16px 0" color="text.secondary">
          Bank Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField name="bankName" label="Bank Name" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="accountNumber" label="Account Number" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="ifscCode" label="IFSC Code" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="branch" label="Branch" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="accountType" label="Account Type" fullWidth variant="outlined" required />
          </Grid>
        </Grid>

        {/* Education Details */}
        <Typography sx={{ fontSize: 27 }} margin="16px 16px 16px 0" color="text.secondary">
          Education Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField name="degree" label="Degree" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="duration" label="Duration" fullWidth variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="institute" label="Institute" fullWidth variant="outlined" required />
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

export default PersonalDetailsForm;

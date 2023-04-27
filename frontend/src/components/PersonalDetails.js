import React from 'react';
import { Card, CardContent, TextField, Grid, InputAdornment, Button, MenuItem, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function PersonalDetails() {
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

  return (
    <div className="p-5">
      <div className="p-1">
        <ThemeProvider theme={theme}>
          <Card>
            <Typography sx={{ fontSize: 30 }} margin={3} color="text.secondary">
              Personal Details
            </Typography>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Full Name" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Address" required multiline rows={3} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Nationality" select required>
                    <MenuItem value="Indian">Indian</MenuItem>
                    <MenuItem value="American">American</MenuItem>
                  </TextField>
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
                  <TextField fullWidth label="Father Name" required />
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
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </TextField>
                </Grid>
                {/* Bank Details  */}
                {/* <h5>Bank Deatils</h5> */}
                <Grid item xs={12} sm={6}>
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
                </Grid>

                {/* Education Details */}
                {/* <h5>Educational Details</h5> */}
                <Grid item xs={12} sm={6}>
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
                </Grid>

                <Grid item xs={12} sm={12} className="d-flex justify-content-end">
                  <Button variant="contained" color="primary">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default PersonalDetails;

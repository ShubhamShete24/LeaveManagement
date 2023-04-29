import React from 'react';
import { Card, CardContent, Grid, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function AllDetails() {
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
    <div>
      <ThemeProvider theme={theme}>
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
        </form>
      </ThemeProvider>
    </div>
  );
}

export default AllDetails;

import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#00cc00' // set the secondary color to green
    }
  },
  overrides: {
    MuiCard: {
      root: {
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'
        }
      }
    }
  }
});
function LeavePage() {
  return (
    <div className="p-5">
      <div className="p-1">
        <ThemeProvider theme={theme}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField name="firstName" label="First Name" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="lastName" label="Last Name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="reason" label="Reason for leave" fullWidth multiline rows={4} />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth>
                    Submit
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

export default LeavePage;

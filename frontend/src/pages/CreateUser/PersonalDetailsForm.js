import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardContent, TextField, Grid, InputAdornment, Button, MenuItem, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { createPersonalDetails, updatePersonalDetails } from '../../services/UserCreation';
import { API_RESPONSE_CODES } from '../../utils/constants';

function PersonalDetailsForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const editUserData = data?.userInfo?.personalDetails;

  // const [otherNationality, setOtherNationality] = useState('');
  const [payload, setPayload] = useState({
    personalDetails: {
      address: '',
      nationality: 'Indian',
      internationalEmployee: false,
      fatherName: '',
      dob: '',
      maritalStatus: '',
      marriageDate: '',
      emergencyContactName: '',
      emergencyContactNo: '',
      bloodGroup: '',
      physicallyChallenged: false,
      PAN: '',
      aadhaarNumber: ''
    },
    bankDetails: {
      bankName: '',
      accountNo: '',
      branch: '',
      IFSC: '',
      accountType: ''
    },
    educationalDetails: {
      degree: '',
      duration: '',
      institute: ''
    }
  });

  const handleSave = async () => {
    // if (payload.personalDetails.nationality === 'other') {
    //   payload.personalDetails.nationality = otherNationality;
    //   payload.personalDetails.internationalEmployee = true;
    // }
    if (!data?.isEdit) {
      payload.userId = data?.userInfo?.userId;

      const createPersonalDetailResult = await createPersonalDetails(payload);
      if (createPersonalDetailResult.status === API_RESPONSE_CODES.SUCCESS_CREATE) {
        navigate('/dashboard/employment-details', { state: { userInfo: data?.userInfo } });
      }
    } else {
      payload.personalDetails._id = editUserData._id;
      payload.bankDetails._id = editUserData.bankDetails._id;
      payload.educationalDetails._id = editUserData.educationalDetails._id;
      const updatePersonalDetailResult = await updatePersonalDetails(payload);
      if (updatePersonalDetailResult.status === API_RESPONSE_CODES.SUCCESS) {
        navigate('/dashboard/user');
      }
    }
  };

  useEffect(() => {
    if (data?.isEdit) {
      setPayload({
        personalDetails: {
          address: editUserData.address,
          nationality: editUserData.nationality,
          internationalEmployee: editUserData.internationalEmployee,
          fatherName: editUserData.fatherName,
          dob: dayjs(editUserData.dob).format('YYYY-MM-DD'),
          maritalStatus: editUserData.maritalStatus,
          marriageDate: dayjs(editUserData.marriageDate).format('YYYY-MM-DD'),
          emergencyContactName: editUserData.emergencyContactName,
          emergencyContactNo: editUserData.emergencyContactNo,
          bloodGroup: editUserData.bloodGroup,
          physicallyChallenged: editUserData.physicallyChallenged,
          PAN: editUserData.PAN,
          aadhaarNumber: editUserData.aadhaarNumber
        },
        bankDetails: {
          bankName: editUserData.bankDetails.bankName,
          accountNo: editUserData.bankDetails.accountNo,
          branch: editUserData.bankDetails.branch,
          IFSC: editUserData.bankDetails.IFSC,
          accountType: editUserData.bankDetails.accountType
        },
        educationalDetails: {
          degree: editUserData.educationalDetails.degree,
          duration: editUserData.educationalDetails.duration,
          institute: editUserData.educationalDetails.institute
        }
      });
    }
  }, []);

  return (
    <div>
      <CardContent>
        <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
          Personal Details
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
              name="address"
              label="Address"
              variant="outlined"
              value={payload.personalDetails.address}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, address: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={payload.personalDetails.nationality !== 'other' ? 12 : 6}>
              {/* <TextField
                name="nationality"
                label="Nationality"
                variant="outlined"
                value={payload.personalDetails.nationality}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    personalDetails: { ...payload.personalDetails, nationality: e.target.value }
                  })
                }
                select
                fullWidth
                required
              >
                <MenuItem value="indian">Indian</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField> */}
              <TextField
                name="nationality"
                label="Nationality"
                fullWidth
                variant="outlined"
                value={payload.personalDetails.nationality}
                disabled
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              {payload.personalDetails.nationality === 'other' ? (
                <TextField
                  name="nationality"
                  label="Nationality"
                  variant="outlined"
                  value={otherNationality}
                  onChange={(e) => setOtherNationality(e.target.value)}
                  fullWidth
                  required
                />
              ) : null}
            </Grid> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="fathersName"
              label="Father's Name"
              variant="outlined"
              value={payload.personalDetails.fatherName}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, fatherName: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              variant="outlined"
              value={payload.personalDetails.dob}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, dob: e.target.value }
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
              name="maritalStatus"
              label="Marital Status"
              variant="outlined"
              value={payload.personalDetails.maritalStatus}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, maritalStatus: e.target.value }
                })
              }
              select
              fullWidth
              required
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
            </TextField>
          </Grid>
          {payload.personalDetails.maritalStatus === 'married' ? (
            <Grid item xs={12} sm={6}>
              <TextField
                name="marriageDate"
                label="Marriage Date"
                type="date"
                variant="outlined"
                value={payload.personalDetails.marriageDate}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    personalDetails: { ...payload.personalDetails, marriageDate: e.target.value }
                  })
                }
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                required
              />
            </Grid>
          ) : null}
          <Grid item xs={12} sm={6}>
            <TextField
              name="emergencyContactName"
              label="Emergency Contact (Name)"
              variant="outlined"
              value={payload.personalDetails.emergencyContactName}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, emergencyContactName: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="emergencyContact"
              label="Emergency Contact"
              type="tel"
              variant="outlined"
              value={payload.personalDetails.emergencyContactNo}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, emergencyContactNo: e.target.value }
                })
              }
              InputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]{10}',
                startAdornment: <InputAdornment position="start">+91</InputAdornment>
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="bloodGroup"
              label="Blood Group"
              variant="outlined"
              value={payload.personalDetails.bloodGroup}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, bloodGroup: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="physicallyChallenged"
              label="Physically Challenged"
              variant="outlined"
              value={payload.personalDetails.physicallyChallenged}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, physicallyChallenged: e.target.value }
                })
              }
              select
              fullWidth
              required
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value>Yes</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="panNumber"
              label="PAN Number"
              variant="outlined"
              value={payload.personalDetails.PAN}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, PAN: e.target.value }
                })
              }
              InputProps={{
                inputMode: 'text',
                pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}'
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="aadhaarNumber"
              label="Aadhaar Number"
              variant="outlined"
              value={payload.personalDetails.aadhaarNumber}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  personalDetails: { ...payload.personalDetails, aadhaarNumber: e.target.value }
                })
              }
              InputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]{12}'
              }}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        {/* Bank Details  */}
        <Typography sx={{ fontSize: 27 }} margin="16px 16px 16px 0" color="text.secondary">
          Bank Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="bankName"
              label="Bank Name"
              variant="outlined"
              value={payload.bankDetails.bankName}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  bankDetails: { ...payload.bankDetails, bankName: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="accountNumber"
              label="Account Number"
              variant="outlined"
              value={payload.bankDetails.accountNo}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  bankDetails: { ...payload.bankDetails, accountNo: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="ifscCode"
              label="IFSC Code"
              variant="outlined"
              value={payload.bankDetails.IFSC}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  bankDetails: { ...payload.bankDetails, IFSC: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="branch"
              label="Branch"
              variant="outlined"
              value={payload.bankDetails.branch}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  bankDetails: { ...payload.bankDetails, branch: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="accountType"
              label="Account Type"
              variant="outlined"
              value={payload.bankDetails.accountType}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  bankDetails: { ...payload.bankDetails, accountType: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
        </Grid>

        {/* Education Details */}
        <Typography sx={{ fontSize: 27 }} margin="16px 16px 16px 0" color="text.secondary">
          Education Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="degree"
              label="Degree"
              variant="outlined"
              value={payload.educationalDetails.degree}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  educationalDetails: { ...payload.educationalDetails, degree: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="duration"
              label="Duration"
              variant="outlined"
              value={payload.educationalDetails.duration}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  educationalDetails: { ...payload.educationalDetails, duration: e.target.value }
                })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="institute"
              label="Institute"
              variant="outlined"
              value={payload.educationalDetails.institute}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  educationalDetails: { ...payload.educationalDetails, institute: e.target.value }
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
  );
}

export default PersonalDetailsForm;

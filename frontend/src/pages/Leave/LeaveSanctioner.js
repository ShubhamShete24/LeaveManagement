import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { USER_INFO_KEY, statusValues } from '../../utils/constants';
import {
  GetAppliedLeaves,
  ResetLeaveApplicationUpdateResponse,
  UpdateLeaveApplication
} from '../../redux/actions/leaveActions';

function LeaveSanctioner() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 30,
    p: 4,
    borderRadius: 2
  };

  const sessionData =
    useSelector((state) => state.LoginUserDetailsReducer.response) || JSON.parse(localStorage.getItem(USER_INFO_KEY));
  const appliedLeaves = useSelector((state) => state.GetAppliedLeavesReducer?.appliedLeaves) || [];
  const dispatch = useDispatch();
  const leaveApplicationUpdatedResponse = useSelector((state) => state.UpdateLeaveApplicationReducer);
  const [leaveApplicationStatusHasChanged, setLeaveApplicationStatusHasChanged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // this should not be hardcoded
    if (sessionData?.user[0]?.role[0]?.roleName !== 'MANAGER') {
      navigate('/');
    }
    dispatch(GetAppliedLeaves(sessionData?.user[0]._id));
    if (leaveApplicationStatusHasChanged) {
      dispatch(
        UpdateLeaveApplication({
          _id: leaveApplication._id,
          status: leaveApplicationStatus,
          leaveCount: leaveApplication.leaveCount,
          userId: leaveApplication?.userId,
          leaveTypeId: leaveApplication?.leaveTypeId
        })
      );
      setLeaveApplicationStatusHasChanged(false);
    }
  }, [dispatch, leaveApplicationStatusHasChanged]);
  useEffect(() => {
    if (leaveApplicationUpdatedResponse?.leaveApplication) {
      setOpen(false);
      setMessageAfterLeaveApplicationStatusUpdate(leaveApplicationUpdatedResponse?.message);
      setSnackBarOpen(true);
      dispatch(ResetLeaveApplicationUpdateResponse());
    }
  }, [leaveApplicationUpdatedResponse]);
  const handleModalClosed = () => {
    setOpen(false);
  };
  const handelModalOpen = (id) => {
    setOpen(true);
    setLeaveApplication(appliedLeaves?.find((data) => data._id === id));
  };
  const [open, setOpen] = useState(false);
  const [leaveApplication, setLeaveApplication] = useState();
  const [leaveApplicationStatus, setLeaveApplicationStatus] = useState();

  const handleStatusChange = (e) => {
    setLeaveApplicationStatus(e.target.value);
    setLeaveApplicationStatusHasChanged(true);
  };
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [messageAfterLeaveApplicationStatusUpdate, setMessageAfterLeaveApplicationStatusUpdate] = useState('');
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackBarClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <>
      <div id="filters" />
      <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 0 }}>
        <TableContainer component={Paper} style={{ width: 1300, alignSelf: 'center', margin: 'auto' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">From date</TableCell>
                <TableCell align="right">From session</TableCell>
                <TableCell align="right">To date</TableCell>
                <TableCell align="right">To session</TableCell>
                <TableCell align="right">Leave Type</TableCell>
                <TableCell align="right">Num. of days</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">Review and sanction</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appliedLeaves?.map((data) => (
                <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell style={{ minWidth: 100 }} component="th" scope="row">
                    {data.userInfo[0].name}
                  </TableCell>
                  <TableCell style={{ minWidth: 100 }} align="right">
                    {new Date(data.fromDate).toDateString()}
                  </TableCell>
                  <TableCell style={{ minWidth: 100 }} align="right">
                    {data.fromSession}
                  </TableCell>
                  <TableCell style={{ minWidth: 100 }} align="right">
                    {new Date(data.toDate).toDateString()}
                  </TableCell>
                  <TableCell style={{ minWidth: 100 }} align="right">
                    {data.toSession}
                  </TableCell>
                  <TableCell style={{ minWidth: 100 }} align="right">
                    {data.leaveType[0].leaveType}
                  </TableCell>
                  <TableCell style={{ minWidth: 90 }} align="right">
                    {data.leaveCount}
                  </TableCell>
                  <TableCell style={{ minWidth: 100 }} align="right">
                    {statusValues.find((_) => _.value === data.status).name}
                  </TableCell>
                  <TableCell style={{ minWidth: 200 }} align="right">
                    <Button onClick={() => handelModalOpen(data._id)}>Action</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal
        open={open}
        onClose={handleModalClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {leaveApplication?.userInfo[0].name}'s leave application.
          </Typography>
          <hr />
          <p>Reason</p>
          <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '0.9rem' }} variant="h6" component="h1">
            {leaveApplication?.reason}
          </Typography>
          <hr />
          <br />
          <InputLabel shrink htmlFor="circle">
            Leave application status
          </InputLabel>
          <Select
            labelId="from-session-label"
            id="from-session-select"
            defaultValue={leaveApplication?.status}
            onChange={handleStatusChange}
            name="leaveApplicationStatus"
          >
            {statusValues.map((statusValue) => (
              <MenuItem key={`s${statusValue.value}`} value={statusValue.value}>
                {statusValue.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Modal>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message={messageAfterLeaveApplicationStatusUpdate}
        action={action}
      />
    </>
  );
}

export default LeaveSanctioner;

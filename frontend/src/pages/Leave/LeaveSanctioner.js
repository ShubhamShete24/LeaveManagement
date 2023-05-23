import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, InputLabel, MenuItem, Modal, Select, Snackbar, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TaskTwoToneIcon from '@mui/icons-material/TaskTwoTone';
import { USER_INFO_KEY, statusValues } from '../../utils/constants';
import {
  GetAppliedLeaves,
  ResetLeaveApplicationUpdateResponse,
  UpdateLeaveApplication
} from '../../redux/actions/leaveActions';
import DataGridComponent from '../../components/dataGrid/dataGrid';

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
  const appliedLeaves = useSelector((state) => state.LeaveReducer?.appliedLeaves) || [];
  const dispatch = useDispatch();
  const leaveApplicationUpdatedResponse = useSelector((state) => state.LeaveReducer);
  const [leaveApplicationStatusHasChanged, setLeaveApplicationStatusHasChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const [leaveApplication, setLeaveApplication] = useState();
  const [leaveApplicationStatus, setLeaveApplicationStatus] = useState();

  const statusValuesMap = {};
  statusValues.forEach((elem) => {
    statusValuesMap[elem.name] = elem.value;
  });
  useEffect(() => {
    dispatch(GetAppliedLeaves(sessionData?.user[0]._id));
  }, [dispatch, leaveApplicationStatusHasChanged]);

  useEffect(() => {
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
  }, [
    dispatch,
    leaveApplication?._id,
    leaveApplication?.leaveCount,
    leaveApplication?.leaveTypeId,
    leaveApplication?.userId,
    leaveApplicationStatus,
    leaveApplicationStatusHasChanged,
    sessionData?.user
  ]);
  useEffect(() => {
    if (leaveApplicationUpdatedResponse?.leaveApplication) {
      setOpen(false);
      setMessageAfterLeaveApplicationStatusUpdate(leaveApplicationUpdatedResponse?.message);
      setSnackBarOpen(true);
      dispatch(ResetLeaveApplicationUpdateResponse());
    }
  }, [dispatch, leaveApplicationUpdatedResponse]);
  const handleModalClosed = () => {
    setOpen(false);
  };
  const handelModalOpen = (data) => {
    setOpen(true);
    setLeaveApplication(appliedLeaves?.find((_) => _._id === data._id));
  };

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

  const leaveApplicationsDataHeader = [
    {
      field: 'userInfo',
      headerName: 'Name ',
      valueGetter: (params) => params.value[0].name,
      flex: 1
    },
    {
      field: 'fromDate',
      headerName: 'From Date',
      valueGetter: (params) => new Date(params.value).toDateString(),
      flex: 1
    },
    {
      field: 'fromSession',
      headerName: 'fromSession',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'toDate',
      headerName: 'To Date',
      valueGetter: (params) => new Date(params.value).toDateString(),
      flex: 1
    },
    {
      field: 'toSession',
      headerName: 'To Session',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'leaveType',
      headerName: 'Leave Type ',
      valueGetter: (params) => params.value[0].leaveType,
      flex: 1
    },
    {
      field: 'leaveCount',
      headerName: 'Leave count',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      valueGetter: (param) => statusValues.find((_) => _.value === param.value).name,
      sortable: false,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 0.25,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) =>
        params.row.status === statusValuesMap?.approved ? (
          <Tooltip title="You have approved leave application! contact admin for any change">
            <TaskTwoToneIcon
              sx={{
                color: 'grey',
                backgroundColor: 'darkgrey'
              }}
            />
          </Tooltip>
        ) : (
          <TaskTwoToneIcon
            style={{ color: 'steelblue', cursor: 'pointer' }}
            onClick={() => handelModalOpen(params.row)}
          />
        )
    }
  ];

  return (
    <>
      {/*
            <TableBody>
              {appliedLeaves?.map((data) => (
               
                 
                  <TableCell style={{ minWidth: 100 }} align="right">
                    {statusValues.find((_) => _.value === data.status).name}
                  </TableCell>
                  <TableCell style={{ minWidth: 200 }} align="right">
                    <Button
                      disabled={data.status === statusValuesMap?.approved}
                      onClick={() => handelModalOpen(data._id)}
                    >
                      Action
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> */}
      <DataGridComponent headers={leaveApplicationsDataHeader} tableData={appliedLeaves} getRowId={(row) => row._id} />
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

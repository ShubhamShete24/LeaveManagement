import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsersData } from '../../redux/actions/userDetailActions';
import DataGridComponent from '../../components/dataGrid/dataGrid';
import ActionButton from '../../components/controls/ActionButtoon';

function Users() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserDetailReducers?.allUsers);

  const calculateAge = (rowData) => {
    const dob = dayjs(rowData?.personalDetails?.dob, 'YYYY-MM-DD');
    const currentDate = dayjs();
    const age = currentDate.diff(dob, 'year');
    return age;
  };

  const userDataHeader = [
    {
      field: 'employeeId',
      headerName: 'Employee Id',
      flex: 0.25,
      sortable: false,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Name ',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'age',
      headerName: 'Age',
      flex: 0.25,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => calculateAge(params.row)
    },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 0.25,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <ActionButton>
          <EditIcon style={{ color: 'blue' }} />
        </ActionButton>
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.25,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <ActionButton>
          <DeleteIcon style={{ color: 'red' }} />
        </ActionButton>
      )
    }
  ];

  useEffect(() => {
    dispatch(getAllUsersData());
  }, []);

  return (
    <div>
      <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
        Users
      </Typography>
      <DataGridComponent tableData={userData} headers={userDataHeader} getRowId={(row) => row.employeeId} />
    </div>
  );
}

export default Users;

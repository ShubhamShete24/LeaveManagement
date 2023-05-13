import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsersData } from '../../redux/actions/userDetailActions';
import DataGridComponent from '../../components/dataGrid/dataGrid';

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.UserDetailReducers?.allUsers);
  useEffect(() => {
    dispatch(getAllUsersData());
  }, []);

  const userDataHeader = [
    {
      field: '_id',
      headerName: 'ID',
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
      renderCell: (params) => (
        <EditIcon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleEdit(params.row)} />
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
        <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleEdit(params.row)} />
      )
    }
  ];

  const handleEdit = (rowData) => {
    console.log(rowData);
  };

  return (
    <div>
      <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
        Users
      </Typography>
      <DataGridComponent tableData={userData} headers={userDataHeader} getRowId={(row) => row._id} />
    </div>
  );
}

export default Users;

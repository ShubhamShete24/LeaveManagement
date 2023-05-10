import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDataGrid from './CustomDataGrid';
import { getAllUsersData } from '../../redux/actions/userDetailActions';

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allusersdata = useSelector((state) => state.UserDetailReducers?.allUsers);
  console.log('userss', allusersdata);

  useEffect(() => {
    dispatch(getAllUsersData());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name ', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EditIcon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleEdit(params.row)} />
        </div>
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleEdit(params.row)} />
        </div>
      )
    }
  ];

  const handleEdit = (rowData) => {
    console.log(rowData);
    // Open a form to edit the user data
  };

  const rows = [
    { id: 1, Name: 'John', email: 'johndoe@example.com', age: 25 },
    { id: 2, Name: 'Jane', email: 'janedoe@example.com', age: 32 },
    { id: 3, Name: 'Bob', email: 'bobsmith@example.com', age: 45 },
    { id: 4, Name: 'Alice', email: 'alicejohnson@example.com', age: 28 },
    { id: 5, Name: 'Mark', email: 'markdavis@example.com', age: 34 }
  ];

  return (
    <div>
      Users
      <CustomDataGrid columns={columns} rows={rows} />
    </div>
  );
}

export default Users;

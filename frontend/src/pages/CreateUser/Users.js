import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
    { field: 'id', headerName: 'ID', width: 80, flex: 1 },
    { field: 'name', headerName: 'Name ', width: 130, flex: 1 },
    { field: 'email', headerName: 'Email', width: 200, flex: 1 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90, flex: 1 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      flex: 1,
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

  const useStyles = makeStyles((theme) => ({
    dataGrid: {
      width: '100%',
      '& .MuiDataGrid-cell': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 100
      },
      [theme.breakpoints.down('xs')]: {
        '& .MuiDataGrid-cell': {
          maxWidth: 50
        }
      }
    }
  }));

  const classes = useStyles();

  return (
    <div className="p-2">
      <div className="p-1">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>Users</div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.dataGrid}>
              <CustomDataGrid columns={columns} rows={rows} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Users;

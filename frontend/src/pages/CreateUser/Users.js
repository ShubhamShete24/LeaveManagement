import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsersData } from '../../redux/actions/userDetailActions';
import DataGridComponent from '../../components/dataGrid/dataGrid';

const useStyles = makeStyles({
  dataGridContainer: {
    width: '100%',
    overflowX: 'auto'
  },
  dataGrid: {
    padding: '0 30px',
    '@media (max-width: 467px)': {
      width: '100%',
      '& .MuiDataGrid-cell': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  }
});

function Users() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

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
    <div className="p-2">
      <div className="p-1">
        <div className={classes.dataGrid}>
          <Typography sx={{ fontSize: 27 }} margin="0 16px 16px 0" color="text.secondary">
            Users
          </Typography>
          <DataGridComponent tableData={userData} headers={userDataHeader} getRowId={(row) => row._id} />
        </div>
      </div>
    </div>
  );
}

export default Users;

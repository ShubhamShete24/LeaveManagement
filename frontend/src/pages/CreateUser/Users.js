import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getAllUsersData } from '../../redux/actions/userDetailActions';
import DataGridComponent from '../../components/dataGrid/dataGrid';
import Popup from '../../components/Popup';
import ActionButton from '../../components/controls/ActionButtoon';
import { deleteUser } from '../../services/UserCreation';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUserData = useSelector((state) => state.UserDetailReducers?.allUsers);
  const userData = allUserData.filter((e) => e.isDeleted === false);

  const [editPopup, setEditPopup] = useState(false);
  const [editInfo, setEditInfo] = useState('');

  const handleEdit = (rowData) => {
    setEditPopup(true);
    setEditInfo(rowData);
  };
  const classes = useStyles();

  const handleDelete = async (rowData) => {
    await deleteUser({ userId: rowData._id });
    dispatch(getAllUsersData());
  };

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
        <ActionButton onClick={() => handleEdit(params.row)}>
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
        <ActionButton onClick={() => handleDelete(params.row)}>
          <DeleteIcon style={{ color: 'red' }} />
        </ActionButton>
      )
    }
  ];

  useEffect(() => {
    dispatch(getAllUsersData());
  }, []);

  return (
    <div className="p-2">
      <div className="p-1">
        <div className={classes.dataGrid}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <Typography sx={{ fontSize: 27 }} color="text.secondary">
              Users
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/dashboard/user-details')}>
              <AddIcon style={{ marginRight: '5px' }} /> Create User
            </Button>
          </Box>
          <DataGridComponent tableData={userData} headers={userDataHeader} getRowId={(row) => row.employeeId} />
          <Popup title="Edit User Detals" openPopup={editPopup} setOpenPopup={setEditPopup}>
            <div style={{ display: 'flex' }}>
              <Typography component="div" style={{ flexGrow: 1, fontSize: 18 }}>
                User Details
              </Typography>
              <ActionButton
                onClick={() => {
                  navigate('/dashboard/user-details', { state: { userInfo: editInfo, isEdit: true } });
                }}
              >
                <EditIcon style={{ color: 'blue' }} />
              </ActionButton>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography component="div" style={{ flexGrow: 1, fontSize: 18 }}>
                Personal Details
              </Typography>
              <ActionButton
                onClick={() => {
                  navigate('/dashboard/personal-info', { state: { userInfo: editInfo, isEdit: true } });
                }}
              >
                <EditIcon style={{ color: 'blue' }} />
              </ActionButton>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography component="div" style={{ flexGrow: 1, fontSize: 18 }}>
                Employment Details
              </Typography>
              <ActionButton
                onClick={() => {
                  navigate('/dashboard/employment-details', { state: { userInfo: editInfo, isEdit: true } });
                }}
              >
                <EditIcon style={{ color: 'blue' }} />
              </ActionButton>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Users;

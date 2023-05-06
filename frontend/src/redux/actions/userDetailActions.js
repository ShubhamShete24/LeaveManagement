import * as types from '../constants';
import { getAllRoles, getAllUsers } from '../../services/UserCreation';
import { getUsers } from '../../services/UserService';

export const getAllUsersData = () => async (dispatch) => {
  await dispatch({ type: types.GET_ALL_USERS_REQUEST });
  try {
    const res = await getAllUsers();
    return dispatch({
      type: types.GET_ALL_USERS_SUCCESS,
      payload: res?.data.data
    });
  } catch (err) {
    return dispatch({ type: types.GET_ALL_USERS_FAILURE, err });
  }
};

export const getRolesData = () => async (dispatch) => {
  await dispatch({ type: types.GET_ROLES_REQUEST });
  try {
    const res = await getAllRoles();
    return dispatch({
      type: types.GET_ROLES_SUCCESS,
      payload: res?.data.data
    });
  } catch (err) {
    return dispatch({ type: types.GET_ROLES_FAILURE, err });
  }
};
export const GetUsersBasedOnCondition = (query) => async (dispatch) => {
  await dispatch({
    type: types.GET_USERS_BASED_ON_CONDITION_REQUEST
  });
  console.log('inside user action');
  getUsers(query).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.GET_USERS_BASED_ON_CONDITION_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.GET_USERS_BASED_ON_CONDITION_FAILURE,
        payload: axiosResponse.data.message
      });
    }
  });
};

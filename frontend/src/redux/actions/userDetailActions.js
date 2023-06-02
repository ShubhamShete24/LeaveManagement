import * as types from '../constants';
import { getAllRoles, getAllUsers } from '../../services/UserCreation';
import {
  getUsers,
  sendEmailWithPasswordResetLink,
  resetPassword,
  getPasswordUpdateStatus
} from '../../services/UserService';

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
export const SendResetPasswordLink = (query) => async (dispatch) => {
  await dispatch({
    type: types.SEND_RESET_PASSWORD_LINK_REQUEST
  });
  sendEmailWithPasswordResetLink(query).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.SEND_RESET_PASSWORD_LINK_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      console.log(axiosResponse);
      await dispatch({
        type: types.SEND_RESET_PASSWORD_LINK_FAILURE,
        payload: axiosResponse.response.data
      });
    }
  });
};

export const RecreatePassword = (query) => async (dispatch) => {
  console.log(query);
  await dispatch({
    type: types.RESET_PASSWORD_REQUEST
  });
  resetPassword(query).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.RESET_PASSWORD_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.RESET_PASSWORD_FAILURE,
        payload: axiosResponse.response.data
      });
    }
  });
};
export const GetPasswordUpdateStatus = (query) => async (dispatch) => {
  console.log(query);
  await dispatch({
    type: types.GET_PASSWORD_UPDATE_STATUS_REQUEST
  });
  getPasswordUpdateStatus(query).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.GET_PASSWORD_UPDATE_STATUS_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.GET_PASSWORD_UPDATE_STATUS_FAILURE,
        payload: axiosResponse.response.data
      });
    }
  });
};

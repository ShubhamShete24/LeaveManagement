import { applyForLeaves, getAppliedLeaves, getLeaveTypes, updateLeaveApplication } from '../../services/LeavesService';
import * as types from '../constants';

export const GetLeaveTypes = () => async (dispatch) => {
  await dispatch({
    type: types.GET_LEAVE_TYPES_REQUEST
  });
  getLeaveTypes().then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.GET_LEAVE_TYPES_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.GET_LEAVE_TYPES_FAILURE,
        payload: axiosResponse.response.data
      });
    }
  });
};

export const ApplyForLeaves = (data) => async (dispatch) => {
  await dispatch({
    type: types.APPLY_FOR_LEAVE_REQUEST
  });

  applyForLeaves(data).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.APPLY_FOR_LEAVE_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.APPLY_FOR_LEAVE_FAILURE,
        payload: axiosResponse.response.data
      });
    }
  });
};

export const GetAppliedLeaves = (managerId) => async (dispatch) => {
  await dispatch({
    type: types.GET_APPLIED_LEAVES_REQUEST
  });
  getAppliedLeaves(managerId).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.GET_APPLIED_LEAVES_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.GET_APPLIED_LEAVES_FAILURE
      });
    }
  });
};

export const UpdateLeaveApplication = (data) => async (dispatch) => {
  await dispatch({
    type: types.UPDATE_LEAVE_APPLICATION_REQUEST
  });
  updateLeaveApplication(data).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.UPDATE_LEAVE_APPLICATION_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.UPDATE_LEAVE_APPLICATION_FAILURE,
        payload: axiosResponse.response.data
      });
    }
  });
};

export const ResetLeaveApplicationUpdateResponse = () => async (dispatch) => {
  await dispatch({
    type: types.RESET_LEAVE_APPLICATION_RESPONSE
  });
};

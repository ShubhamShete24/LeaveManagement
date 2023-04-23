import * as types from '../constants';
import { getData, postData } from '../../utils/rest-services';
import { BASE_URL } from '../../utils/constants';

export const GetLeaveTypes = () => async (dispatch) => {
  await dispatch({
    type: types.GET_LEAVE_TYPES_REQUEST
  });
  getData(`${BASE_URL}leaves/get-leave-types`).then(async (axiosResponse) => {
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

  postData(`${BASE_URL}leaves/apply-for-leaves`, data).then(async (axiosResponse) => {
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

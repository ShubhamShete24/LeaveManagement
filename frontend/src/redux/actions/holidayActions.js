import * as types from '../constants';
import { getData, postData } from '../../utils/rest-services';
import { BASE_URL, HOLIDAY_API_URL } from '../../utils/constants';

export const GetAllHolidays = () => async (dispatch) => {
  await dispatch({
    type: types.GET_ALL_HOLIDAY_REQUEST
  });
  getData(`${BASE_URL}${HOLIDAY_API_URL}get-all-holidays`).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.GET_ALL_HOLIDAY_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.GET_ALL_HOLIDAY_FAILURE,
        payload: axiosResponse.response
      });
    }
  });
};

export const CreateHolidays = (data) => async (dispatch) => {
  await dispatch({
    type: types.CREATE_HOLIDAY_REQUEST
  });
  console.log('holiday Success');
  postData(`${BASE_URL}${HOLIDAY_API_URL}create-holiday`, data).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.CREATE_HOLIDAY_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.CREATE_HOLIDAY_FAILURE,
        payload: axiosResponse.response
      });
    }
  });
};

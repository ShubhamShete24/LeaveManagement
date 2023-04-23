import * as types from '../constants';
import { getData } from '../../utils/rest-services';
import { BASE_URL } from '../../utils/constants';

export const GetAllHolidays = () => async (dispatch) => {
  await dispatch({
    type: types.GET_ALL_HOLIDAY_REQUEST
  });
  getData(`${BASE_URL}holiday/get-all-holidays`).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      await dispatch({
        type: types.GET_ALL_HOLIDAY_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.GET_ALL_HOLIDAY_FAILURE,
        payload: axiosResponse.response.data
      });
    }
  });
};

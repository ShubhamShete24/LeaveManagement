import { getUsers } from '../../services/UserService';
import * as types from '../constants';

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

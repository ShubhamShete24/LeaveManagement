import * as types from '../constants';
import { postData } from '../../utils/rest-services';
import { BASE_URL, USER_INFO_KEY, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { setLocalStorageItem } from '../../utils/utis';

export const LoginUserDetails = (data) => async (dispatch) => {
  await dispatch({ type: types.LOGIN_USERS_DETAILS_REQUEST });
  postData(`${BASE_URL}/user/authenticate`, data).then(async (axiosResponse) => {
    if (axiosResponse.data) {
      setLocalStorageItem(USER_INFO_KEY, JSON.stringify(axiosResponse.data));
      setLocalStorageItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, axiosResponse.data.authToken);
      await dispatch({
        type: types.LOGIN_USERS_DETAILS_SUCCESS,
        payload: axiosResponse.data
      });
    } else {
      await dispatch({
        type: types.LOGIN_USERS_DETAILS_FAILURE,
        payload: axiosResponse.response.data
      });
    }
  });
};

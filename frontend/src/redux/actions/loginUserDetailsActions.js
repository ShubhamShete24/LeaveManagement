import * as types from '../constants';

export const LoginUserDetails = (data) => async (dispatch) => {
  await dispatch({ type: types.LOGIN_USERS_DETAILS_REQUEST });
  //   try {
  // need to call login api
  console.log(data);
  await dispatch({
    type: types.LOGIN_USERS_DETAILS_SUCCESS,
    payload: data
  });
  //   } catch (err) {
  //     return dispatch({ type: types.LOGIN_USERS_DETAILS_FAILURE, err });
  //   }
};

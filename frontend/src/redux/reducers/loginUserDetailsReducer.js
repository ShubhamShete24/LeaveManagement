import * as types from '../constants';

const initialState = {
  response: '',
  fetchLoginUserData: false
};

// eslint-disable-next-line default-param-last
export default function LoginUserDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USERS_DETAILS_REQUEST:
      return {
        ...state,
        fetchLoginUserData: false
      };

    case types.LOGIN_USERS_DETAILS_SUCCESS:
      // set info to local stroge
      return {
        ...state,
        fetchLoginUserData: true,
        response: action.payload
      };

    case types.LOGIN_USERS_DETAILS_FAILURE:
      return {
        ...state,
        fetchUserData: true,
        response: action.payload
      };

    default:
      return state;
  }
}

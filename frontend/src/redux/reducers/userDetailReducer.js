import * as types from '../constants';

const initialState = {
  usersBasedOnCondition: [],
  message: '',
  allUsers: [],
  allRoles: []
};

// eslint-disable-next-line default-param-last
export default function UserDetailReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_USERS_BASED_ON_CONDITION_REQUEST:
      return {
        ...state
      };

    case types.GET_USERS_BASED_ON_CONDITION_SUCCESS:
      return {
        ...state,
        usersBasedOnCondition: action.payload.users,
        message: action.payload.message
      };

    case types.GET_USERS_BASED_ON_CONDITION_FAILURE:
      return {
        ...state,
        usersBasedOnCondition: null,
        message: action.payload.message
      };

    default:
      return state;
  }
}

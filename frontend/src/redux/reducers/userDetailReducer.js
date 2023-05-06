import * as types from '../constants';

const initialState = {
  usersBasedOnCondition: [],
  message: '',
  allUsers: [],
  allRoles: []
};

// eslint-disable-next-line default-param-last
export default function UserDetailReducers(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_USERS_REQUEST: {
      return {
        ...state
      };
    }
    case types.GET_ALL_USERS_SUCCESS: {
      return {
        ...state,
        allUsers: action.payload
      };
    }
    case types.GET_ALL_USERS_FAILURE: {
      return {
        ...state,
        allUsers: []
      };
    }
    case types.GET_ROLES_REQUEST: {
      return {
        ...state
      };
    }
    case types.GET_ROLES_SUCCESS: {
      return {
        ...state,
        allRoles: action.payload
      };
    }
    case types.GET_ROLES_FAILURE: {
      return {
        ...state,
        allRoles: []
      };
    }
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
    default: {
      return state;
    }
  }
}

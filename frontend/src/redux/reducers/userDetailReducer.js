import * as types from '../constants';

const initialState = {
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
    default: {
      return state;
    }
  }
}

import * as types from '../constants';

const initialState = {
  usersBasedOnCondition: [],
  passwordResetProcessResponse: null,
  passwordUpdateStatus: 0,
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
    case types.SEND_RESET_PASSWORD_LINK_REQUEST:
      return {
        ...state
      };
    case types.SEND_RESET_PASSWORD_LINK_SUCCESS:
      return {
        ...state,
        passwordResetProcessResponse: action.payload.data.passwordResetProcessResponse,
        message: action.payload.message
      };
    case types.SEND_RESET_PASSWORD_LINK_FAILURE:
      return {
        ...state,
        passwordResetProcessResponse: null,
        message: action.payload.message
      };
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordResetProcessResponse: action.payload.data.passwordResetProcessResponse,
        message: action.payload.message
      };
    case types.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        passwordResetProcessResponse: null,
        message: action.payload.message
      };
    case types.RESET_MESSGE_USER_DETAILS:
      return {
        ...state,
        passwordResetProcessResponse: null,
        message: ''
      };
    case types.GET_PASSWORD_UPDATE_STATUS_REQUEST:
      return {
        ...state
      };
    case types.GET_PASSWORD_UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        passwordUpdateStatus: action.payload.data.passwordUpdateStatus,
        message: action.payload.message
      };
    case types.GET_PASSWORD_UPDATE_STATUS_FAILURE:
      return {
        ...state,
        passwordUpdateStatus: null,
        message: action.payload.message
      };
    default: {
      return state;
    }
  }
}

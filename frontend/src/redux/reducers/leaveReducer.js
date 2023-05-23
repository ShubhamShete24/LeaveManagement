import * as types from '../constants';

const leaveTypesInitialState = {
  leaveTypes: '',
  message: '',
  leaveBalances: '',
  leaveApplication: '',
  leavesApplied: '',
  appliedLeaves: ''
};

// eslint-disable-next-line default-param-last
export function LeaveReducer(state = leaveTypesInitialState, action) {
  switch (action.type) {
    case types.GET_LEAVE_TYPES_FAILURE: {
      return {
        ...state,
        message: action.payload.message
      };
    }
    case types.GET_LEAVE_TYPES_REQUEST: {
      return {
        ...state
      };
    }
    case types.GET_LEAVE_TYPES_SUCCESS: {
      return {
        ...state,
        leaveTypes: action.payload.leaveTypes,
        message: action.payload.message
      };
    }
    case types.GET_LEAVE_BALANCES_REQUEST: {
      return {
        ...state
      };
    }
    case types.GET_LEAVE_BALANCES_FAILURE: {
      return {
        ...state
      };
    }
    case types.GET_LEAVE_BALANCES_SUCCESS: {
      return {
        ...state,
        leaveBalances: action.payload.leaveBalances,
        message: action.payload.message
      };
    }
    case types.APPLY_FOR_LEAVE_FAILURE: {
      return {
        ...state,
        message: action.payload.message
      };
    }
    case types.APPLY_FOR_LEAVE_REQUEST: {
      return {
        ...state
      };
    }
    case types.APPLY_FOR_LEAVE_SUCCESS: {
      return {
        ...state,
        leavesApplied: action.payload.appliedLeaves,
        message: action.payload.message
      };
    }
    case types.GET_APPLIED_LEAVES_FAILURE: {
      return {
        ...state,
        message: action.payload.message
      };
    }
    case types.GET_APPLIED_LEAVES_REQUEST: {
      return {
        ...state
      };
    }
    case types.GET_APPLIED_LEAVES_SUCCESS: {
      return {
        ...state,
        appliedLeaves: action.payload.appliedLeaves,
        message: action.payload.message
      };
    }
    case types.UPDATE_LEAVE_APPLICATION_FAILURE: {
      return {
        ...state,
        message: action.payload.message
      };
    }
    case types.UPDATE_LEAVE_APPLICATION_REQUEST: {
      return {
        ...state
      };
    }
    case types.UPDATE_LEAVE_APPLICATION_SUCCESS: {
      return {
        ...state,
        leaveApplication: action.payload.leaveApplication,
        message: action.payload.message
      };
    }
    case types.RESET_LEAVE_APPLICATION_RESPONSE: {
      return {
        ...state,
        leaveApplication: null,
        message: ''
      };
    }
    default: {
      return state;
    }
  }
}

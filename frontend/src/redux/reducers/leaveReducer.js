import * as types from '../constants';

const leaveTypesInitialState = {
  leaveTypes: '',
  message: ''
};

// eslint-disable-next-line default-param-last
export function GetLeaveTypesReducer(state = leaveTypesInitialState, action) {
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
    default: {
      return state;
    }
  }
}
const leavesAppliedInitialState = {
  leavesApplied: '',
  leaveAppliedMessage: ''
};
// eslint-disable-next-line default-param-last
export function ApplyForLeavesReducer(state = leavesAppliedInitialState, action) {
  switch (action.type) {
    case types.APPLY_FOR_LEAVE_FAILURE: {
      return {
        ...state,
        leaveAppliedMessage: action.payload.message
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
        leavesApplied: action.payload.leavesApplied,
        leaveAppliedMessage: action.payload.message
      };
    }
    default: {
      return state;
    }
  }
}

const appliedLeavesInitialState = {
  appliedLeaves: '',
  message: ''
};
// eslint-disable-next-line default-param-last
export function GetAppliedLeavesReducer(state = appliedLeavesInitialState, action) {
  // console.log('this is in reducer');
  switch (action.type) {
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
    default: {
      return state;
    }
  }
}

const leaveApplicationInitialState = {
  leaveApplication: '',
  message: ''
};
// eslint-disable-next-line default-param-last
export function UpdateLeaveApplicationReducer(state = leaveApplicationInitialState, action) {
  switch (action.type) {
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

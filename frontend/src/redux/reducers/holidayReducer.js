import * as types from '../constants';

const holidaysInitialState = {
  holidays: [],
  message: ''
};

// eslint-disable-next-line default-param-last
export default function GetHolidaysReducer(state = holidaysInitialState, action) {
  switch (action.type) {
    case types.GET_ALL_HOLIDAY_FAILURE: {
      return {
        ...state
      };
    }
    case types.GET_ALL_HOLIDAY_REQUEST: {
      return {
        ...state
      };
    }
    case types.GET_ALL_HOLIDAY_SUCCESS: {
      return {
        ...state,
        holidays: action.payload.holidays,
        message: action.payload.message
      };
    }
    default: {
      return state;
    }
  }
}

import * as types from '../constants';

const holidaysInitialState = {
  holidays: [],
  createholidays: [],
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
    case types.CREATE_HOLIDAY_FAILURE: {
      return {
        ...state
      };
    }
    case types.CREATE_HOLIDAY_REQUEST: {
      return {
        ...state
      };
    }
    case types.CREATE_HOLIDAY_SUCCESS: {
      return {
        ...state,
        createholidays: action.payload.createholidays,
        message: action.payload.message
      };
    }
    default: {
      return state;
    }
  }
}

import { combineReducers } from 'redux';
import LoginUserDetailsReducer from './loginUserDetailsReducer';
import { GetLeaveTypesReducer, ApplyForLeavesReducer } from './leaveReducer';
import GetHolidaysReducer from './holidayReducer';

export default combineReducers({
  LoginUserDetailsReducer,
  GetLeaveTypesReducer,
  ApplyForLeavesReducer,
  GetHolidaysReducer
});

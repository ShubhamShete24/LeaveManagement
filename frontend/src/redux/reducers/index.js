import { combineReducers } from 'redux';
import LoginUserDetailsReducer from './loginUserDetailsReducer';
import {
  GetLeaveTypesReducer,
  ApplyForLeavesReducer,
  GetAppliedLeavesReducer,
  UpdateLeaveApplicationReducer
} from './leaveReducer';
import GetHolidaysReducer from './holidayReducer';

export default combineReducers({
  LoginUserDetailsReducer,
  GetLeaveTypesReducer,
  ApplyForLeavesReducer,
  GetHolidaysReducer,
  GetAppliedLeavesReducer,
  UpdateLeaveApplicationReducer
});

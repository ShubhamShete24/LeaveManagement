import { combineReducers } from 'redux';
import LoginUserDetailsReducer from './loginUserDetailsReducer';
import {
  GetLeaveTypesReducer,
  ApplyForLeavesReducer,
  GetAppliedLeavesReducer,
  UpdateLeaveApplicationReducer,
  GetLeaveBalancesReducer
} from './leaveReducer';
import GetHolidaysReducer from './holidayReducer';
import UserDetailReducers from './userDetailReducer';

export default combineReducers({
  LoginUserDetailsReducer,
  GetLeaveTypesReducer,
  ApplyForLeavesReducer,
  GetHolidaysReducer,
  GetAppliedLeavesReducer,
  UpdateLeaveApplicationReducer,
  UserDetailReducers,
  GetLeaveBalancesReducer
});

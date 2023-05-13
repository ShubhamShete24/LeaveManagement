import { combineReducers } from 'redux';
import LoginUserDetailsReducer from './loginUserDetailsReducer';
import { LeaveReducer } from './leaveReducer';
import GetHolidaysReducer from './holidayReducer';
import UserDetailReducers from './userDetailReducer';

export default combineReducers({
  LoginUserDetailsReducer,
  GetHolidaysReducer,
  UserDetailReducers,
  LeaveReducer
});

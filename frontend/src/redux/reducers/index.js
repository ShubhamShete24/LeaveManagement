import { combineReducers } from 'redux';
import LoginUserDetailsReducer from './loginUserDetailsReducer';
import GetHolidaysReducer from './holidayReducer';

export default combineReducers({
  LoginUserDetailsReducer,
  GetHolidaysReducer
});

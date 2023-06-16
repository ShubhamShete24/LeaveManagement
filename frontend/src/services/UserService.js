import { BASE_URL, USER_API_URL } from '../utils/constants';
import { postData } from '../utils/rest-services';

export const getUsers = (query) => postData(`${BASE_URL}${USER_API_URL}get-users-based-on-condition`, query);

export const sendEmailWithPasswordResetLink = (payload) =>
  postData(`${BASE_URL}${USER_API_URL}forgot-password`, payload);

export const resetPassword = (payload) => postData(`${BASE_URL}${USER_API_URL}reset-password`, payload);

export const getPasswordUpdateStatus = (payload) =>
  postData(`${BASE_URL}${USER_API_URL}get-password-update-status`, payload);

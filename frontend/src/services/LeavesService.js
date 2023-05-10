import { BASE_URL, LEAVES_API_URL } from '../utils/constants';
import { getData, postData, getDataBasedOnQueryParams, putData } from '../utils/rest-services';

export const getLeaveTypes = () => getData(`${BASE_URL}${LEAVES_API_URL}get-leave-types`);

export const applyForLeaves = (data) => postData(`${BASE_URL}${LEAVES_API_URL}apply-for-leaves`, data);

export const getAppliedLeaves = (managerId) => {
  const params = {
    managerId
  };
  return getDataBasedOnQueryParams(`${BASE_URL}${LEAVES_API_URL}get-applied-leaves`, params);
};

export const updateLeaveApplication = (data) => putData(`${BASE_URL}${LEAVES_API_URL}update-leave-application`, data);

export const getLeaveBalances = (userId) => {
  const params = {
    userId
  };
  return getDataBasedOnQueryParams(`${BASE_URL}${LEAVES_API_URL}get-leave-balances`, params);
};

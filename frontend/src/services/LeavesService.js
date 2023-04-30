import { BASE_URL } from '../utils/constants';
import { getData, postData, getDataBasedOnQueryParams, putData } from '../utils/rest-services';

export const getLeaveTypes = () => getData(`${BASE_URL}leaves/get-leave-types`);

export const applyForLeaves = (data) => postData(`${BASE_URL}leaves/apply-for-leaves`, data);

export const getAppliedLeaves = (managerId) => {
  const params = {
    managerId
  };
  return getDataBasedOnQueryParams(`${BASE_URL}leaves/get-applied-leaves`, params);
};

export const updateLeaveApplication = (data) => putData(`${BASE_URL}leaves/update-leave-application`, data);

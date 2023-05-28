import { BASE_URL, ROLE_API_URL, USER_API_URL } from '../utils/constants';
import { postData, getData, putData } from '../utils/rest-services';

export const getAllUsers = async () => getData(`${BASE_URL}${USER_API_URL}get-users`);

export const getAllRoles = async () => getData(`${BASE_URL}${ROLE_API_URL}get-roles`);

export const createUser = async (payload) => postData(`${BASE_URL}${USER_API_URL}create-user`, payload);

export const createPersonalDetails = async (payload) =>
  postData(`${BASE_URL}${USER_API_URL}create-personalDetails`, payload);

export const createEmploymentDetails = async (payload) =>
  postData(`${BASE_URL}${USER_API_URL}create-employmentDetails`, payload);

export const updatePersonalDetails = async (payload) =>
  putData(`${BASE_URL}${USER_API_URL}update-personalDetails`, payload);

export const updateEmploymentDetails = async (payload) =>
  putData(`${BASE_URL}${USER_API_URL}update-employmentDetails`, payload);

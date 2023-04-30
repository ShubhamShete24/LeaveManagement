import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from './constants';

export const logoutUser = () => {
  localStorage.clear();
  window.location.reload();
};

// eslint-disable-next-line consistent-return
const handleErrorResponse = async (err) => {
  if (err.response) {
    if (err.response.status === 401) {
      logoutUser();
    }
  }
  return err;
};

const handleSuccessResponse = (res) => res;

// const headersTokenObj = {
//   'Content-Type': 'application/x-www-form-urlencoded',
//   'Access-Control-Allow-Origin': '*'
// };

const headersObj = {
  'Content-Type': 'application/json'
};

const returnTokenWithBearer = (token) => `Bearer ${token}`;

// get methods

export const getData = (url) => {
  headersObj.Authorization = returnTokenWithBearer(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY));

  return axios
    .get(url, {
      headers: headersObj
    })
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err, { type: 'GET', url }));
};

export const getDataBasedOnQueryParams = (url, params) => {
  headersObj.Authorization = returnTokenWithBearer(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY));
  return axios
    .get(url, {
      headers: headersObj,
      params
    })
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err, { type: 'GET', url }));
};

// post method

export const postData = (url, body) => {
  headersObj.Authorization = returnTokenWithBearer(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY));

  return axios
    .post(url, body, {
      headers: headersObj
    })
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err), { type: 'POST', url, body });
};

export const putData = (url, body) => {
  headersObj.Authorization = returnTokenWithBearer(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY));

  return axios
    .put(url, body, {
      headers: headersObj
    })
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err), { type: 'PUT', url, body });
};

export const deleteData = (url, body) => {
  headersObj.Authorization = returnTokenWithBearer(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY));

  return axios
    .post(url, body, {
      headers: headersObj
    })
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err), { type: 'POST', url, body });
};

// delete method

export const deleteMethod = (url, body) => {
  headersObj.Authorization = returnTokenWithBearer(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY));

  return axios
    .delete(url, body, {
      headers: headersObj
    })
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err), { type: 'DELETE', url, body });
};

export const LOCAL_STORAGE_KEYS = {
  TOKEN_KEY: 'accessToken',
  REFRESH_TOKEN_KEY: 'refreshToken'
};

export const BASE_URL = 'http://localhost:8000';
export const USER_API_URL = '/api/user/';
export const ROLE_API_URL = '/api/role/';
export const LEAVES_API_URL = '/api/leaves/';
export const HOLIDAY_API_URL = '/api/holiday/';

export const USER_INFO_KEY = 'userInfo';
export const statusValues = [
  {
    name: 'pending',
    value: 3
  },
  {
    name: 'approved',
    value: 1
  },
  {
    name: 'rejected',
    value: 2
  }
];

export const API_RESPONSE_CODES = {
  SUCCESS: 200,
  SUCCESS_CREATE: 201,
  SUCCESS_NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  PAYLOAD_ERROR: 502
};

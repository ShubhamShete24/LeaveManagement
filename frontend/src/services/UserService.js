import { BASE_URL, USER_API_URL } from '../utils/constants';
import { postData } from '../utils/rest-services';

export const getUsers = (query) => postData(`${BASE_URL}${USER_API_URL}get-users-based-on-condition`, query);

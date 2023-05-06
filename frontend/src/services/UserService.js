import { BASE_URL } from '../utils/constants';
import { postData } from '../utils/rest-services';

export const getUsers = (query) => postData(`${BASE_URL}user/get-users-based-on-condition`, query);

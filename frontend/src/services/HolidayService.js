import { BASE_URL, HOLIDAY_API_URL } from '../utils/constants';
import { postData, getData } from '../utils/rest-services';

export const getAllHolidays = async () => getData(`${BASE_URL}${HOLIDAY_API_URL}get-holidays`);

export const createHoliday = async (payload) => postData(`${BASE_URL}${HOLIDAY_API_URL}create-holiday`, payload);

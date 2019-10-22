import axios from 'axios';

import { API_URL } from '../store/constants';

const Api = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  withCredentials: true,
});

export default Api;
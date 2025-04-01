import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { USER_KEY } from '@/constants';

const httpClient = axios.create({
  baseURL: process.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(USER_KEY);

    if (authToken) {
      const { exp = 0 } = jwtDecode(authToken);

      // Convert the expiration time in milliseconds before 60 seconds
      const expirationTime = exp * 1000 - 60000;

      if (Date.now() >= expirationTime) {
        localStorage.removeItem(USER_KEY);

        return Promise.reject('Access token expired');
      }

      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default httpClient;

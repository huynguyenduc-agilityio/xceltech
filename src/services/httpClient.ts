import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Constants
import { USER_KEY } from '@/constants';

const httpClient = axios.create({
  baseURL: process.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    Object.keys(params).forEach((key) => {
      if (Array.isArray(params[key])) {
        params[key] = params[key].join(',');
      }
    });

    return new URLSearchParams(params).toString();
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(USER_KEY);

    if (authToken) {
      const parsedData = JSON.parse(authToken);
      const token = parsedData?.state?.authUser.access;

      const { exp = 0 } = jwtDecode(token);

      // Convert the expiration time in milliseconds before 60 seconds
      const expirationTime = exp * 1000 - 60000;

      if (Date.now() >= expirationTime) {
        localStorage.removeItem(USER_KEY);
        return Promise.reject('Access token expired');
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default httpClient;

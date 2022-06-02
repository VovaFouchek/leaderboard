import axios from 'axios';

export const axiosConfig = {
  baseURL: 'http://localhost:3001',
};

const instance = axios.create(axiosConfig);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 500) {
      return instance(error.config);
    }
    throw error.response;
  }
);

export default instance;

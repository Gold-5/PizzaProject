import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API ошибка:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;

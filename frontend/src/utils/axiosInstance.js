import axios from 'axios';

export default (history = null) => {
  const baseURL = 'http://localhost:5000';
  const headers = {};

  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }

  const axiosInstance = axios.create({
    baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 401) {
        localStorage.removeItem('token');

        if (history) {
          history.push('/login');
        } else {
          window.location = '/login';
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};

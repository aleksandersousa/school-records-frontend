import axios from 'axios';

const HOST = import.meta.env.VITE_BASE_API_URL;

export const authApi = axios.create({
  baseURL: HOST,
});

console.log(HOST);

export const publicApi = axios.create({
  baseURL: HOST,
});

// Add a response interceptor
authApi.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.status === 401) {
      window.dispatchEvent(new Event('logout'));
    }
    return await Promise.reject(error);
  }
);

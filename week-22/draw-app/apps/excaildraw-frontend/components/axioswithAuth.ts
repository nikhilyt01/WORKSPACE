
import axios from 'axios';
import { http_backend } from '@/config';

const axiosWithAuth = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return axios.create({
    baseURL: http_backend,
    headers: {
      Authorization: `${token}`,
    },
  });
};

export default axiosWithAuth;



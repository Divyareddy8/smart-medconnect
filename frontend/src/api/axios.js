// src/api/axios.js
import axios from 'axios';
import { getToken } from '../utils/tokenHelper';

const instance = axios.create({
  baseURL: 'http://localhost:5050/api', //  Must match backend port
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

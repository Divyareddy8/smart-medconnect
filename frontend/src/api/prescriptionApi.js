// src/api/prescriptionApi.js
import axios from './axios';

export const getMyPrescriptions = async () => {
  return axios.get('/prescriptions/me'); // Adjust route if different
};
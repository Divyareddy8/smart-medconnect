import api from './axios';

export const getDoctorAppointments = () => api.get('/doctor/appointments');
export const issuePrescription = (data) => api.post('/doctor/prescription', data);
export const getDoctorsBySpecialization = (spec) => axios.get(`/doctors/by-specialization/${spec}`);
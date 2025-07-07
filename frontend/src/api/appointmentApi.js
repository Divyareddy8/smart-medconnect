import api from './axios';

export const getAppointments = () => api.get('/appointments');
export const getMyAppointments = () => api.get('/appointments/self'); 
export const bookAppointment = (data) => api.post('/appointments/book', data);
export const putPrescription = (data) => api.put('/appointments/prescription', data);

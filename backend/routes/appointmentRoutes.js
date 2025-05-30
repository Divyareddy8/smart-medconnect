const express = require('express');
const { bookAppointment, getDoctorAppointments, getAllAppointments } = require('../controllers/appointmentController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Book an appointment - Patient
router.post('/book', protect, bookAppointment);

// Get doctor’s appointments - Doctor
router.get('/doctor', protect, getDoctorAppointments);

// Admin - All appointments
router.get('/all', protect, getAllAppointments);

module.exports = router;

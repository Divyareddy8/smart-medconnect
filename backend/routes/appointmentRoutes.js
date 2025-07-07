const express = require('express');
const { bookAppointment, getDoctorAppointments, getAllAppointments,addPrescription, getOwnAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Book an appointment - Patient
router.post('/book', protect, bookAppointment);

// Get doctor’s appointments - Doctor
router.get('/doctor', protect, getDoctorAppointments);

// Admin - All appointments
router.get('/all', protect, getAllAppointments);

router.put('/prescription', protect, addPrescription);

// Modifications:

//Get your own appointments(patients)
router.get('/self', protect, getOwnAppointments);

router.post('/update/status', protect, updateAppointmentStatus);
//--------------------------------------------------------------------------

module.exports = router;

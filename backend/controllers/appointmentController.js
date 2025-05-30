const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Book appointment
exports.bookAppointment = async (req, res) => {
  const { doctorId, date, reason } = req.body;
  try {
    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      reason
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error booking appointment', error: err.message });
  }
};

// Get appointments for a doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id }).populate('patient', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

// Admin - all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient doctor', 'name role email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all appointments' });
  }
};

exports.addPrescription = async (req, res) => {
  const { appointmentId, prescription } = req.body;
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Only doctors can add prescriptions' });
    }

    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { prescription },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating prescription', error: err.message });
  }
};

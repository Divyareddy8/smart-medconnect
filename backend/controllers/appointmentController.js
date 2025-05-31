const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Book appointment - Only patients can book
exports.bookAppointment = async (req, res) => {
  if (req.user.role !== 'patient') {
    return res.status(400).json({ message: 'Bad Request', error: 'Only patients can book appointments' });
  }
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

// Get all appointments for the logged-in doctor
exports.getDoctorAppointments = async (req, res) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ message: 'Forbidden', error: 'Only doctors can view their appointments' });
  }

  try {
    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate('patient', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

// Admin - Get all appointments (only admin role)
exports.getAllAppointments = async (req, res) => {
  console.log("🔍 Current user in getAllAppointments:", req.user);

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden', error: 'Only admins can view all appointments' });
  }

  try {
    const appointments = await Appointment.find().populate('patient doctor', 'name role email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all appointments', error: err.message });
  }
};


// Add or update prescription - Only doctors
exports.addPrescription = async (req, res) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ message: 'Forbidden', error: 'Only doctors can add prescriptions' });
  }

  const { appointmentId, prescription } = req.body;

  try {
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { prescription },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating prescription', error: err.message });
  }
};

// Get appointments for logged-in user (patient or doctor)
exports.getOwnAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === 'patient') {
      appointments = await Appointment.find({ patient: req.user.id })
        .populate('doctor', 'name email');
    } else if (req.user.role === 'doctor') {
      appointments = await Appointment.find({ doctor: req.user.id })
        .populate('patient', 'name email');
    } else {
      return res.status(400).json({ message: 'Bad Request', error: 'Appointments can only be viewed by patients or doctors' });
    }

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

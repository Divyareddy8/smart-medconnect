const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Availability = require('../models/Availability');

//Modification: helper fxn
async function getTimeSlots (doctorId, date){
  const availability = await Availability.findOne({ doctor: doctorId, date });
  let timeSlots = [];
    if (availability === null) { //if i cant find anything in availability, means doctor is available on his default timeSlots..
      const doctor = await User.findById(doctorId);
      if (!doctor) {
        throw new Error("Doctor not found");
      }
      timeSlots = doctor.defaultTimeSlots; 
    }
    else timeSlots = availability.timeSlots;
    console.log(timeSlots);
    return timeSlots;
}

//Modification: helper fxn
async function modifyAvailability(doctorId, date, timeSlots) {
  const availability = await Availability.findOneAndUpdate(
        { doctor: doctorId, date },
        { timeSlots },
        { upsert: true, new: true }
      );
} 


// Book appointment - Only patients can book
exports.bookAppointment = async (req, res) => {
  if (req.user.role !== 'patient') {
    return res.status(403).json({ message: 'Forbidden', error: 'Only patient can book appointments' });
  }

  const { doctorId, date, time, reason } = req.body;
  if (!doctorId || !date || !time){
    return res.status(400).json({message : 'Bad request', error : 'doctorId, date and time are required'});
  }
  try {
    //Modification
    //check if the doctor is available on that date and time
    const timeSlots = await getTimeSlots(doctorId, date);
    if (!timeSlots.includes(time)){
      return res.status(409).json({ message: 'Doctor is not available at the requested time' });
    }
    //Doctor is available
    const updatedTime = timeSlots.filter(item => item !== time);
    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time,
      reason
    });
    await appointment.save();
    await modifyAvailability(doctorId, date, updatedTime);
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error booking appointment', error: err.message });
  }
};

// Get all appointments for the logged-in doctor
//Modification: Doctor can view his own appointments while admin can view appointments of any doctor. Admins have to provide doctor id as parameter in url
exports.getDoctorAppointments = async (req, res) => {
  if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden', error: 'Patients can\'t see doctors\' appointments' });
  }

  try {
    if (req.user.role === 'admin'){
      if (!req.query.doctorId){
        return res.status(400).json({message : 'Bad request', error : 'Doctor Id is required'});
      }
      const appointments = await Appointment.find({ doctor: req.query.doctorId }).populate('patient', 'name email');
      res.json(appointments);
    }
    else {
      const appointments = await Appointment.find({ doctor: req.user.id }).populate('patient', 'name email');
      res.json(appointments);
    }
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

  const { appointmentId, prescription = ''} = req.body;

  if (!appointmentId){
    return res.status(400).json({message : 'Bad request', error : 'Appointment Id is required'});
  }

  try {
    const updated = await Appointment.findOneAndUpdate( //Modification: A doctor can only add prescription to appointments taken by him
    { _id: appointmentId, doctor: req.user.id },
    { prescription },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Appointment not found or unauthorized" });
  }

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
      return res.status(403).json({ message: 'Forbidden', error: 'Appointments can only be viewed by patients or doctors' });
    }

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

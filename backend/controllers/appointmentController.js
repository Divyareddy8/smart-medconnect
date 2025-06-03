const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Availability = require("../models/Availability");

//Modification: helper fxn
async function getTimeSlots(doctorId, date) {
  const availability = await Availability.findOne({ doctor: doctorId, date });
  let timeSlots = [];
  if (availability === null) {
    //if i cant find anything in availability, means doctor is available on his default timeSlots..
    const doctor = await User.findById(doctorId);
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    timeSlots = doctor.defaultTimeSlots;
  } else timeSlots = availability.timeSlots;
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

//Modification: helper fxn
function isFutureDateTime(dateStr, timeStr) {
  // Combine date and time into a single ISO string
  const fullDateTimeStr = `${dateStr.slice(0, 10)}T${timeStr}:00.000Z`; // e.g., "2025-10-20T14:30:00.000Z"

  const inputDateTime = new Date(fullDateTimeStr);
  const now = new Date();

  return inputDateTime > now;
}

// Book appointment - Only patients can book
exports.bookAppointment = async (req, res) => {
  if (req.user.role !== "patient") {
    return res
      .status(403)
      .json({
        error: "Forbidden",
        message: "Only patient can book appointments",
      });
  }

  const { doctorId, date, time, reason } = req.body;
  if (!doctorId || !date || !time) {
    return res
      .status(400)
      .json({
        error: "Bad request",
        message: "doctorId, date and time are required",
      });
  }
  try {
    //Modification: you cant book appointments in the past
    if (!isFutureDateTime(date, time)) {
      return res
        .status(400)
        .json({
          error: "Bad request",
          message: "You cannot book appointments in the past",
        });
    }

    //check if the doctor is available on that date and time
    const timeSlots = await getTimeSlots(doctorId, date);
    if (!timeSlots.includes(time)) {
      return res
        .status(409)
        .json({ message: "Doctor is not available at the requested time" });
    }
    //Doctor is available

    // Modification: Check if the patient is available on this time
    const patientAppointments = (
      await Appointment.find({ patient: req.user.id, date })
    ).map((item) => item.time);
    if (patientAppointments.includes(time)) {
      return res
        .status(409)
        .json({ message: "Patient is not available at the requested time" });
    }

    const updatedTime = timeSlots.filter((item) => item !== time);
    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time,
      reason,
    });
    await appointment.save();
    await modifyAvailability(doctorId, date, updatedTime);
    await appointment.populate("doctor", "name email"); //Modification: To maintain symmetry of the returned appointment format across different calls
    console.log(appointment);
    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error booking appointment", message: err.message });
  }
};

// Get all appointments for the logged-in doctor
//Doctor can view his own appointments while admin can view appointments of any doctor. Admins have to provide doctor id as parameter in url
exports.getDoctorAppointments = async (req, res) => {
  if (req.user.role !== "doctor" && req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        error: "Forbidden",
        message: "Patients can't see doctors' appointments",
      });
  };

    try {
      if (req.user.role === "admin") {
        if (!req.query.doctorId) {
          return res
            .status(400)
            .json({ error: "Bad request", message: "Doctor Id is required" });
        }
        const appointments = await Appointment.find({
          doctor: req.query.doctorId,
        }).populate("patient", "name email");
        res.json(appointments);
      } else {
        const appointments = await Appointment.find({
          doctor: req.user.id,
        }).populate("patient", "name email");
        res.json(appointments);
        message;
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error fetching appointments", message: err.message });
    }
  }

  // Admin - Get all appointments (only admin role)
  exports.getAllAppointments = async (req, res) => {
    console.log("🔍 Current user in getAllAppointments:", req.user);

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          error: "Forbidden",
          message: "Only admins can view all appointments",
        });
    }

    try {
      const appointments = await Appointment.find().populate(
        "patient doctor",
        "name role email"
      );
      res.json(appointments);
    } catch (err) {
      res
        .status(500)
        .json({
          error: "Error fetching all appointments",
          message: err.message,
        });
    }
  };

  // Add or update prescription - Only doctors
  exports.addPrescription = async (req, res) => {
    if (req.user.role !== "doctor") {
      return res
        .status(403)
        .json({
          error: "Forbidden",
          message: "Only doctors can add prescriptions",
        });
    }

    const { appointmentId, prescription = "" } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "Appointment Id is required" });
    }

    try {
      const updated = await Appointment.findOneAndUpdate(
        //A doctor can only add prescription to appointments taken by him
        { _id: appointmentId, doctor: req.user.id },
        { prescription },
        { new: true }
      );

      if (!updated) {
        return res
          .status(404)
          .json({ message: "Appointment not found or unauthorized" });
      }

      if (!updated) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(updated);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error updating prescription", message: err.message });
    }
  };

  // Get appointments for logged-in user (patient or doctor)
  exports.getOwnAppointments = async (req, res) => {
    try {
      let appointments;

      if (req.user.role === "patient") {
        appointments = await Appointment.find({
          patient: req.user.id,
        }).populate("doctor", "name email");
      } else if (req.user.role === "doctor")
        appointments = await Appointment.find({ doctor: req.user.id }).populate(
          "patient",
          "name email"
        );
      else {
        return res
          .status(403)
          .json({
            error: "Forbidden",
            message: "Appointments can only be viewed by patients or doctors",
          });
      }

      res.json(appointments);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error fetching appointments", message: err.message });
    }
  };

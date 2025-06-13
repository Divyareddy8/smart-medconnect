const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

//-----------------------------------------------------Helper Functions---------------------------------------------------------------------------------------------------

async function cancelAppointments(doctorId, date, timeSlots) {
  const appointments = await Appointment.find({ doctor: doctorId, date });
  appointments.map(async (item) => {
    if (timeSlots === null || !timeSlots.includes(item.time)) {
      await Appointment.findOneAndUpdate(item, { status: "cancelled" });
    }
  });
}

//-----------------------------------------------------Set Availability (doctor)---------------------------------------------------------------------------------------------------

exports.setAvailability = async (req, res) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({
      message: "Forbidden",
      error: "Only doctor can set his/her availability",
    });
  }
  
  const { date, timeSlots = [] } = req.body;
  
  if (!date) {
    return res
    .status(400)
    .json({ message: "Bad request", error: "Date is required" });
  }
  
  try {
    await cancelAppointments(req.user.id, date, timeSlots);
    const availability = await Availability.findOneAndUpdate(
      { doctor: req.user.id, date },
      { timeSlots },
      { upsert: true, new: true }
    );
    
    res.json(availability);
  } catch (err) {
    res.status(500).json({
      message: "Error setting availability",
      error: err.message,
    });
  }
};

//-----------------------------------------------------Get Availability (admin, doctor, patient)---------------------------------------------------------------------------------------------------

exports.getAvailability = async (req, res) => {
  const { doctorId = "*", date } = req.query;

  try {
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const dayStart = new Date(date);
    dayStart.setUTCHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setUTCHours(23, 59, 59, 999);

    if (doctorId === "*") {
      const doctors = await User.find({ role: "doctor" });
      let availabilities = await Promise.all(doctors.map(async (d) => {
        let availability = await Availability.findOne({
          doctor: d._id,
          date: { $gte: dayStart, $lte: dayEnd },
        });
        if (!availability) {
          availability = new Availability({
            doctor: d._id,
            date,
            timeSlots: d.defaultTimeSlots,
          });
        }
        availability.doctor = d;
        return availability;
      }));
      res.json(availabilities);
    } else {
      let availability = await Availability.findOne({
        doctor: doctorId,
        date: { $gte: dayStart, $lte: dayEnd },
      });

      if (!availability) {
        // If availability is null it means doctor is available on the default working hours, stored in the User collection
        const doctor = await User.findById(doctorId); //fetch the doctors default working hours
        if (!doctor) {
          throw new Error("Doctor not found");
        }
        const timeSlots = doctor.defaultTimeSlots;
        availability = new Availability({
          doctor: doctorId,
          date,
          timeSlots,
        });
      }

      res.json(availability);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching availability", error: err.message });
  }
};

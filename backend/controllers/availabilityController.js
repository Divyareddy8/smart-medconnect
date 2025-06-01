const Availability = require('../models/Availability');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Helper function
async function cancelAppointments(doctorId, date, timeSlots){
  const appointments = await Appointment.find({doctor: doctorId, date});
  appointments.map(async (item)=>{
    if (timeSlots === null || !timeSlots.includes(item.time)){
      await Appointment.findOneAndUpdate(item, { status: 'cancelled' });
    }
  })
}

// Only doctors can set availability
//Modification: If the doctor modifies his/her working time slots for a particular day, all the appointments of this doctor 
//on this particular day, that clashes with the doctors new working hours will be cancelled
exports.setAvailability = async (req, res) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({
      message: 'Forbidden',
      error: 'Only doctor can set his/her availability'
    });
  }

  const { date, timeSlots = []} = req.body;

  if (!date){
    return res.status(400).json({message : 'Bad request', error : 'Date is required'});
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
      message: 'Error setting availability',
      error: err.message
    });
  }
};

//Modification: * Every doctor will have a default working hour field, set by the doctor during registration
//              * If there is data in Availability corresponding to a doctor on a particular date, it means doctor is free on the default working hours
//              * Whenever there is a change in the doctors schedule on a particular date like some patient booking an appointment, etc then we will add a field in the Availability collection for the doctor on this date

exports.getAvailability = async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    if (!doctorId || !date) {
      return res.status(400).json({ message: 'doctorId and date are required' });
    }

    const dayStart = new Date(date);
    dayStart.setUTCHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setUTCHours(23, 59, 59, 999);

    let availability = await Availability.findOne({
      doctor: doctorId,
      date: { $gte: dayStart, $lte: dayEnd }
    });

    if (!availability) { // If availability is null it means doctor is available on the default working hours, stored in the User collection
      const doctor = await User.findById(doctorId); //fetch the doctors default working hours
      if (!doctor) {
        throw new Error("Doctor not found");
      }
      const timeSlots = doctor.defaultTimeSlots;
      availability = new Availability({
        doctor: doctorId,
        date,
        timeSlots
      });
    }

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching availability', error: err.message });
  }
};

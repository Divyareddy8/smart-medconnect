// controllers/availabilityController.js
const Availability = require('../models/Availability');

// Only doctors can set availability
exports.setAvailability = async (req, res) => {
  if (req.user.role !== 'doctor') {
    return res.status(400).json({
      message: 'Bad Request',
      error: 'Only doctor can set his/her availability'
    });
  }

  const { date, timeSlots } = req.body;

  try {
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

    const availability = await Availability.findOne({
      doctor: doctorId,
      date: { $gte: dayStart, $lte: dayEnd }
    });

    if (!availability) {
      return res.status(404).json({ message: 'No availability found for this doctor on this date' });
    }

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching availability', error: err.message });
  }
};

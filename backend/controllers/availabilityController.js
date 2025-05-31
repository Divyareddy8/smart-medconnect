const Availability = require('../models/Availability');

exports.setAvailability = async (req, res) => {
  if (req.user.role !== 'doctor') return res.status(400).json({ message: 'Bad Request', error: 'Only doctor can set his/her availability' });
  const { date, timeSlots } = req.body;
  try {
    const availability = await Availability.findOneAndUpdate(
      { doctor: req.user.id, date },
      { timeSlots },
      { upsert: true, new: true }
    );
    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: 'Error setting availability', error: err.message });
  }
};

exports.getAvailability = async (req, res) => {
  const { doctorId, date } = req.query;
  try {
    const availability = await Availability.findOne({ doctor: doctorId, date });
    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching availability', error: err.message });
  }
};

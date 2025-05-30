// backend/models/Availability.js
const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlots: [String] // ["10:00", "10:30", ...]
});

module.exports = mongoose.model('Availability', availabilitySchema);

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  reason: { type: String },
  prescription: {
  type: String,
  default: ''
},
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);

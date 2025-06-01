const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: {type: String, required : true}, //Modification: added time
  reason: { type: String },
  prescription: {
  type: String,
  default: ''
},
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' } //Modification: Added cancelled
});

module.exports = mongoose.model('Appointment', appointmentSchema);

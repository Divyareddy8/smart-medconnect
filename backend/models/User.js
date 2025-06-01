const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['patient', 'doctor', 'pharmacy', 'admin'],
    default: 'patient'
  },
  consultationFee: {
    type: Number,
    default: 0
  },
  //Modification
  defaultTimeSlots: [String] // ["10:00", "10:30", ...]
});

// Optional: Prevent non-doctors from having a consultationFee set and default time slots
userSchema.pre('save', function (next) {
  if (this.role !== 'doctor') {
    this.consultationFee = undefined;
    //Modification
    this.defaultTimeSlots = undefined; //Default working hours of a doctor
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

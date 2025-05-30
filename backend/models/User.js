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
  }
});

// Optional: Prevent non-doctors from having a consultationFee set
userSchema.pre('save', function (next) {
  if (this.role !== 'doctor') {
    this.consultationFee = undefined;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

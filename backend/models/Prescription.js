const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patient: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  doctorName: {type: String},
  issueDate: { type: Date },
  medicines: [
    {
      medicineName: { type: String, required: true },
      dosage: { type: Number, min: 1 }, //Number of times a day
      duration: { type: Number, min: 1 }, //duration in days
    },
  ],
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
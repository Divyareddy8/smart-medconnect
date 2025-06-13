const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["patient", "doctor", "pharmacy", "admin"],
    default: "patient",
  },
  consultationFee: {
    type: Number,
    default: 0,
  },
  //Modification
  defaultTimeSlots: [String], // ["10:00", "10:30", ...]
  specializations: [
    {
      //Array of enums
      type: String,
      enum: [
        "Cardiologist", // Heart specialist
        "Dermatologist", // Skin specialist
        "Neurologist", // Brain and nervous system
        "Orthopedic Surgeon", // Bones and joints
        "Pediatrician", // Children’s health
        "Psychiatrist", // Mental health
        "Ophthalmologist", // Eyes
        "Gynecologist", // Female reproductive health
        "Oncologist", // Cancer specialist
        "Endocrinologist", // Hormones and glands
        "Gastroenterologist", // Digestive system
        "Nephrologist", // Kidneys
        "Pulmonologist", // Lungs and respiratory system
        "Rheumatologist", // Joints, arthritis, autoimmune diseases
        "Urologist", // Urinary tract and male reproductive system
        "Hematologist", // Blood disorders
        "Anesthesiologist", // Pain relief and anesthesia
        "ENT Specialist", // Ear, Nose, and Throat
        "General Practitioner", // Overall health and common illnesses
        "Pathologist", // Diagnoses using lab tests
        "Radiologist", // Imaging like X-rays, MRIs, etc.
        "Allergist", // Allergy and immune system
        "Plastic Surgeon", // Cosmetic and reconstructive surgery
        "Infectious Disease Specialist", // Diseases caused by pathogens
        "Geriatrician", // Health care of elderly people
      ],
    },
  ],
});

// Optional: Prevent non-doctors from having a consultationFee set and default time slots
userSchema.pre("save", function (next) {
  if (this.role !== "doctor") {
    this.consultationFee = undefined;
    //Modification
    this.defaultTimeSlots = undefined; //Default working hours of a doctor
    this.specializations = undefined; //Default working hours of a doctor
  }
  if (this.role !== 'patient'){
    this.prescriptions = undefined;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);

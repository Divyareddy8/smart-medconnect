const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//-----------------------------------------------------Helper fxn---------------------------------------------------------------------------------------------------
function formatEmail(email) {
  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    throw new Error("Invalid email: missing '@' symbol.");
  }

  const localPart = email.slice(0, atIndex).toLowerCase();
  const domainPart = email.slice(atIndex); // includes the '@'

  return localPart + domainPart;
}


//-----------------------------------------------------Register (admin, doctor, patient)---------------------------------------------------------------------------------------------------

exports.registerUser = async (req, res) => {
  const { name, email : em, password, role, defaultTimeSlots, specializations} = req.body;
  if (role != 'patient' && role != 'doctor') return res.status(400).json({ message: "Invalid role" });
  try {
    const email = formatEmail(em);
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ name, email, password: hashedPassword, role , defaultTimeSlots, specializations});
    await newUser.save();
    
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
    
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//-----------------------------------------------------Login (admin, doctor, patient)---------------------------------------------------------------------------------------------------

exports.loginUser = async (req, res) => {
  const { email : em, password } = req.body;

  try {
    const email = formatEmail(em);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//----------------------------------to Get All Specializations--------------------
exports.getAllSpecializations = async (req, res) => {
  try {
    // const users = await User.find({ role: "doctor" });
    // const specSet = new Set();
    // users.forEach((user) => {
    //   if (user.specializations) {
    //     user.specializations.forEach((s) => specSet.add(s));
    //   }
    // });
    // res.json([...specSet]);
    res.json(
      [
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
      ]
    );
  } catch (err) {
    res.status(500).json({ message: "Error fetching specializations" });
  }
};
//----------------------------------Get Doctors by Specialization--------
exports.getDoctorsBySpecialization = async (req, res) => {
  const { specialization } = req.query;
  try {
    const doctors = await User.find({
      role: "doctor",
      specializations: specialization,
    });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
};

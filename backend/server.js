const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const protect = require('./middleware/authMiddleware');
const cron = require('node-cron');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('Mongo URI:', process.env.MONGO_URI);

//------------------------------------------------------------------
//  Auto-create Admin and Pharmacy on Server Startup
// Prevents unauthorized role registration via frontend
// These users can login only if their credentials match env variables
//------------------------------------------------------------------
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    //  Ensure admin exists
    let admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!admin) {
      const hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newAdmin = new User({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedAdminPassword,
        role: 'admin'
      });
      await newAdmin.save();
      console.log(' Admin user created');
    }

    //  Ensure pharmacy exists
    let pharmacy = await User.findOne({ email: process.env.PHARMACY_EMAIL });
    if (!pharmacy) {
      const hashedPharmacyPassword = await bcrypt.hash(process.env.PHARMACY_PASSWORD, 10);
      const newPharmacy = new User({
        name: 'Pharmacy',
        email: process.env.PHARMACY_EMAIL,
        password: hashedPharmacyPassword,
        role: 'pharmacy'
      });
      await newPharmacy.save();
      console.log(' Pharmacy user created');
    }

    console.log(' MongoDB connected');
  } catch (err) {
    console.error(' MongoDB connection error:', err);
  }
}

connectDB();

//------------------------------------------------------------------
//  Routes Setup
//------------------------------------------------------------------
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes); // optional duplicate path

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);

const availabilityRoutes = require('./routes/availabilityRoutes');
app.use('/api/availability', availabilityRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const prescriptionRoutes = require('./routes/prescriptionRoutes');
app.use('/api/prescription', prescriptionRoutes);

//  Public route to get all doctor details (excluding password)
app.use('/api/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }, '-password');
    res.json(doctors);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctors', doctorRoutes);

//------------------------------------------------------------------
//  Start Server
//------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

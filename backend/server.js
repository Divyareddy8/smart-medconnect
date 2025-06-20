const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const protect = require('./middleware/authMiddleware');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('Mongo URI:', process.env.MONGO_URI);

//Modification: an admin can no longer register in the database. Instead, when the backend starts, the admin automatically gets registered by the backend
//              This is to ensure that no unauthorised person makes a new account and simply registers as an admin to access unauthorised data
//              To login as an admin, set the email to be ADMIN_EMAIL environment variable and password to be ADMIN_PASSWORD environment variable
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    let user = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (user == null){
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newUser = new User({ name :'Admin', email : process.env.ADMIN_EMAIL, password: hashedPassword, role : 'admin'});
      await newUser.save();
    }
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);

const availabilityRoutes = require('./routes/availabilityRoutes');
app.use('/api/availability', availabilityRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const prescriptionRoutes = require('./routes/prescriptionRoutes');
app.use('/api/prescription', prescriptionRoutes);

app.use('/api/doctors', async (req, res)=>{ //No need to protect it, users that arent logged in can also view details of all the doctors
  try{
    const doctors = await User.find({ role: 'doctor'}, '-password');
    res.json(doctors);
  } catch (error){
    res.status(500).json(error.message);
  }
});
const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctors', doctorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cron = require('node-cron');
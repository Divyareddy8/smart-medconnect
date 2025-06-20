const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllSpecializations,
  getDoctorsBySpecialization
} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const User = require('../models/User');

// Register & Login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Specializations
router.get("/specializations", getAllSpecializations);
router.get("/doctors", getDoctorsBySpecialization);

// Get current logged-in user
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to get all specializations
router.get('/specializations', async (req, res) => {
  try {
    const specs = await User.distinct('specialization', { role: 'doctor' });
    res.json(specs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch specializations' });
  }
});

// Route to get doctors by specialization
router.get('/by-specialization/:specialization', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor', specialization: req.params.specialization });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

module.exports = router;
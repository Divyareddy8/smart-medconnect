const express = require('express');
const router = express.Router();
const { setAvailability, getAvailability } = require('../controllers/availabilityController');
const protect = require('../middleware/authMiddleware');

router.post('/set', protect, setAvailability);
router.get('/get', protect, getAvailability);

module.exports = router;

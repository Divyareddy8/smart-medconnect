const express = require('express');
const { setConsultationFee } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/set-fee', protect, setConsultationFee);

module.exports = router;

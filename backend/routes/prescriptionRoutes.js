const express = require('express');
const router = express.Router();
const { getPrescription } = require('../controllers/prescriptionController');
const protect = require('../middleware/authMiddleware');

router.get("/get", protect, getPrescription);
module.exports = router
const User = require('../models/User');

exports.setConsultationFee = async (req, res) => {
  //Modification
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden', error: 'Only admin can set consultation fee' });
  const { doctorId, fee } = req.body;

  if (!doctorId || !fee){
    return res.status(400).json({message : 'Bad request', error : 'Doctor id and Consultation fee are required'});
  }
  try {
    const doctor = await User.findByIdAndUpdate(doctorId, { consultationFee: fee }, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Error setting fee', error: err.message });
  }
};


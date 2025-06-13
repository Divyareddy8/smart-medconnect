
//------------------------------------------------------get prescription(patient)-------------------------------------------------------------------------------------

const Prescription = require("../models/Prescription");

exports.getPrescription = async (req, res) => {
    if  (req.user.role !== 'patient') {
        return res.status(403).json({
        message: "Forbidden",
        error: "Only patient can see his/her prescriptions",
        });
    }
    try 
    {
        const prescriptions = await Prescription.find({patient: req.user._id});
        res.json(prescriptions);
    } catch(err){
        res
      .status(500)
      .json({ message: "Error fetching prescription", error: err.message });
    }
}

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function formatEmail(email) {
  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    throw new Error("Invalid email: missing '@' symbol.");
  }

  const localPart = email.slice(0, atIndex).toLowerCase();
  const domainPart = email.slice(atIndex); // includes the '@'

  return localPart + domainPart;
}

//Modifications: 1) Format emails before adding them to the database, so emails are now case insensitive
//               2) Admins can no longer Register. To login as the admin set email to admin@gmail.com and password as specified in the .env file
exports.registerUser = async (req, res) => {
  const { name, email : em, password, role, defaultTimeSlots } = req.body;
  if (role != 'patient' && role != 'doctor') return res.status(400).json({ message: "Invalid role" });
  try {
    const email = formatEmail(em)
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role , defaultTimeSlots});
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

//Modification: Format email before searching the database. This way we can make email case insensitive
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

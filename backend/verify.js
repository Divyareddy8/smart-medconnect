// verify.js
require('dotenv').config(); // ✅ Load environment variables
const jwt = require('jsonwebtoken');

// Paste the token received from login/register API response
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzkyOGJjYzg5ZTBmYjIzZGJiN2QyZCIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzQ4NTc2NDQ0fQ.Gr_r-9cKDgJefDXPqAmxQFKssB-AmOpgQSKJMRYr91c';

// Use the secret from the .env file
const secret = process.env.JWT_SECRET;

try {
  const decoded = jwt.verify(token, secret);
  console.log('✅ Decoded payload:', decoded);
} catch (e) {
  console.error('❌ Token verification error:', e.message);
}

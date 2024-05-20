const jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret key for JWT (in a real application, store this securely, e.g., in environment variables)
const SECRET_KEY = process.env.SECRET_KEY;

// Function to generate a JWT
function generateToken(userId) {
  const payload = { userId };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Auth Header:', authHeader);  // Log the received auth header
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);  // Log the extracted token

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


// Function to extract user ID from JWT
function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.userId;
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  authenticateToken,
  getUserIdFromToken
};
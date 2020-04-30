const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    next();
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).send('Token not valid');
    }
  }
};

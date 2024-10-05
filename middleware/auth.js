const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  // Get the Authorization header value (usually in the format 'Bearer <token>')
  const authHeader = req.headers['Authorization'];

  // Check if the Authorization header is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  // Extract the token from the 'Bearer <token>' format
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token with the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user data to the request object
    req.user = decoded;
    
    // Call the next middleware in the stack
    next();
  } catch (err) {
    // If token verification fails, return an unauthorized error
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateJWT;

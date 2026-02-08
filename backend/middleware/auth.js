const jwt = require('jsonwebtoken');

/**
 * Middleware: require a valid JWT in Authorization header.
 * If valid, sets req.user = { id, username, email } and calls next().
 * If missing or invalid, returns 401.
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  const token = authHeader.slice(7); // remove "Bearer "
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, email } (what you put in the token)
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { requireAuth };

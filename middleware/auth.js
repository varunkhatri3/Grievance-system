const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'f4e7d52405a8db7df3a8e9c2470ec6c0d19e7b61c17f3d084b14f582c3d7b2cd';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: "No token, authorization denied" });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

module.exports = { authenticate, authorize };
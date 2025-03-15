const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// User-only route

router.get('/me', authenticate, async (req, res) => {
  try {
    // console.log("Request Object:",req);
    // Fetch user details by userId from the decoded JWT token
    const user = await User.findOne({email: req.user.email});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/profile', authenticate, authorize(['user', 'admin']), (req, res) => {
  res.status(200).json({ message: "Welcome to your profile!" });
});
module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/auth - quick check that router is mounted
router.get('/', (req, res) => res.json({ ok: true, message: 'Auth router works' }));

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(409).json({
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken',
      });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;

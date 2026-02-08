const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

// Debug: log every request that hits the auth router (remove once login works)
router.use((req, res, next) => {
  console.log('[Auth]', req.method, req.path);
  next();
});

// GET /api/auth - quick check that router is mounted
router.get('/', (req, res) => res.json({ ok: true, message: 'Auth router works' }));

// GET /api/auth/me - return current user if valid token (for "stay logged in" on refresh)
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

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

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {

   
   
    const { login, password } = req.body; // login = email or username

    if (!login || !password) {
      return res.status(400).json({ message: 'Email/username and password are required', success: false });
    }

    const user = await User.findOne({
      $or: [
        { email: login.toLowerCase().trim() },
        { username: login.trim() },
      ],
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email/username or password', success: false });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email/username or password', success: false });
    }

    const payload = { id: user._id.toString(), username: user.username, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      success: true,
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', success: false });
  }
});

module.exports = router;

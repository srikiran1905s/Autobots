const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://2410030489_db_user:Svvk%402227@cluster0.x7avxez.mongodb.net/autobots?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// OBD Code Schema
const obdCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  make: {
    type: String,
    default: 'Generic'
  },
  meaning: {
    type: String,
    required: true
  },
  possible_causes: [{
    type: String
  }],
  troubleshooting_steps: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const OBDCode = mongoose.model('OBDCode', obdCodeSchema);

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AutoBots API is running' });
});

// Sign Up Route
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// Sign In Route
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Sign in successful',
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during sign in' 
    });
  }
});

// Get all users (for testing)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ 
      success: true, 
      count: users.length,
      users 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching users' 
    });
  }
});

// OBD Code Routes

// Get OBD code by code
app.get('/api/obd/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const obdCode = await OBDCode.findOne({ code: code.toUpperCase() });
    
    if (!obdCode) {
      return res.status(404).json({ 
        success: false, 
        message: 'OBD code not found' 
      });
    }

    res.json({ 
      success: true, 
      data: obdCode 
    });
  } catch (error) {
    console.error('Error fetching OBD code:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching OBD code' 
    });
  }
});

// Get all OBD codes
app.get('/api/obd', async (req, res) => {
  try {
    const { make } = req.query;
    const filter = make ? { make: make } : {};
    
    const codes = await OBDCode.find(filter).sort({ code: 1 });
    res.json({ 
      success: true, 
      count: codes.length,
      data: codes 
    });
  } catch (error) {
    console.error('Error fetching OBD codes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching OBD codes' 
    });
  }
});

// Search OBD codes
app.get('/api/obd/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const codes = await OBDCode.find({
      $or: [
        { code: { $regex: query, $options: 'i' } },
        { meaning: { $regex: query, $options: 'i' } }
      ]
    }).limit(10);

    res.json({ 
      success: true, 
      count: codes.length,
      data: codes 
    });
  } catch (error) {
    console.error('Error searching OBD codes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error searching OBD codes' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

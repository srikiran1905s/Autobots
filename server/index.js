const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://2410030489_db_user:Svvk%402227@cluster0.x7avxez.mongodb.net/autobots?retryWrites=true&w=majority';

// Track MongoDB connection status
let isMongoDBConnected = false;

// In-memory storage fallback
const inMemoryUsers = new Map();
const inMemoryOBDCodes = new Map();
const inMemoryVehicles = new Map();

// Load OBD codes from JSON files into memory
function loadOBDCodesIntoMemory() {
  try {
    const dataDir = path.join(__dirname, 'data');
    
    // Load generic codes
    const genericCodesPath = path.join(dataDir, 'generic_codes.json');
    if (fs.existsSync(genericCodesPath)) {
      const genericCodes = JSON.parse(fs.readFileSync(genericCodesPath, 'utf8'));
      genericCodes.forEach(code => {
        inMemoryOBDCodes.set(code.code, { ...code, make: 'Generic' });
      });
      console.log(`📦 Loaded ${genericCodes.length} generic OBD codes`);
    }
    
    // Load additional generic codes
    const additionalCodesPath = path.join(dataDir, 'additional_generic_codes.json');
    if (fs.existsSync(additionalCodesPath)) {
      const additionalCodes = JSON.parse(fs.readFileSync(additionalCodesPath, 'utf8'));
      additionalCodes.forEach(code => {
        inMemoryOBDCodes.set(code.code, code);
      });
      console.log(`📦 Loaded ${additionalCodes.length} additional generic OBD codes`);
    }
    
    // Load Toyota codes
    const toyotaCodesPath = path.join(dataDir, 'toyota_codes.json');
    if (fs.existsSync(toyotaCodesPath)) {
      const toyotaCodes = JSON.parse(fs.readFileSync(toyotaCodesPath, 'utf8'));
      toyotaCodes.forEach(code => {
        inMemoryOBDCodes.set(code.code, { ...code, make: 'Toyota' });
      });
      console.log(`📦 Loaded ${toyotaCodes.length} Toyota OBD codes`);
    }
    
    // Load Ford codes
    const fordCodesPath = path.join(dataDir, 'ford_codes.json');
    if (fs.existsSync(fordCodesPath)) {
      const fordCodes = JSON.parse(fs.readFileSync(fordCodesPath, 'utf8'));
      fordCodes.forEach(code => {
        inMemoryOBDCodes.set(code.code, { ...code, make: 'Ford' });
      });
      console.log(`📦 Loaded ${fordCodes.length} Ford OBD codes`);
    }
    
    console.log(`✅ Total OBD codes in memory: ${inMemoryOBDCodes.size}`);
  } catch (error) {
    console.error('❌ Error loading OBD codes:', error.message);
  }
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    isMongoDBConnected = true;
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Running in IN-MEMORY mode (data will not persist)');
    console.log('💡 To fix: Whitelist your IP in MongoDB Atlas or check network connection');
    isMongoDBConnected = false;
    // Load OBD codes from JSON files
    loadOBDCodesIntoMemory();
  });

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

// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  engine: String,
  horsepower: String,
  transmission: String,
  drivetrain: String,
  fuel_economy: String,
  seating_capacity: Number,
  price_range: String,
  description: String,
  key_features: [String],
  image_url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

vehicleSchema.index({ make: 1, model: 1, year: 1 }, { unique: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (isMongoDBConnected) {
      // Use MongoDB
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'User with this email already exists' 
        });
      }

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
    } else {
      // Use in-memory storage
      if (inMemoryUsers.has(email.toLowerCase())) {
        return res.status(400).json({ 
          success: false, 
          message: 'User with this email already exists' 
        });
      }

      const newUser = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date()
      };

      inMemoryUsers.set(email.toLowerCase(), newUser);

      res.status(201).json({ 
        success: true, 
        message: 'User registered successfully (in-memory)',
        user: {
          id: newUser.id,
          email: newUser.email,
          createdAt: newUser.createdAt
        }
      });
    }
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

    if (isMongoDBConnected) {
      // Use MongoDB
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
    } else {
      // Use in-memory storage
      const user = inMemoryUsers.get(email.toLowerCase());
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
        message: 'Sign in successful (in-memory)',
        user: {
          id: user.id,
          email: user.email
        }
      });
    }
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
    const codeUpper = code.toUpperCase();
    
    if (isMongoDBConnected) {
      // Use MongoDB
      const obdCode = await OBDCode.findOne({ code: codeUpper });
      
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
    } else {
      // Use in-memory storage
      const obdCode = inMemoryOBDCodes.get(codeUpper);
      
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
    }
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

// Vehicle Routes

// Get all vehicles or filter by make
app.get('/api/vehicles', async (req, res) => {
  try {
    const { make } = req.query;
    const filter = make ? { make: make } : {};
    
    const vehicles = await Vehicle.find(filter).sort({ make: 1, model: 1 });
    res.json({ 
      success: true, 
      count: vehicles.length,
      data: vehicles 
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching vehicles' 
    });
  }
});

// Get vehicles by make
app.get('/api/vehicles/:make', async (req, res) => {
  try {
    // Decode URL parameter and handle special characters
    let { make } = req.params;
    make = decodeURIComponent(make);
    
    // Escape special regex characters except for spaces and hyphens
    const escapedMake = make.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    const vehicles = await Vehicle.find({ 
      make: new RegExp(`^${escapedMake}$`, 'i') 
    }).sort({ model: 1 });
    
    console.log(`Searching for vehicles with make: ${make}, found: ${vehicles.length}`);
    
    if (vehicles.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No vehicles found for make: ${make}`
      });
    }
    
    res.json({ 
      success: true, 
      count: vehicles.length,
      data: vehicles 
    });
  } catch (error) {
    console.error('Error fetching vehicles by make:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching vehicles' 
    });
  }
});

// Get specific vehicle by make and model
app.get('/api/vehicles/:make/:model', async (req, res) => {
  try {
    const { make, model } = req.params;
    const vehicle = await Vehicle.findOne({ 
      make: new RegExp(`^${make}$`, 'i'),
      model: new RegExp(`^${model}$`, 'i')
    }).sort({ year: -1 });
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: `Vehicle not found: ${make} ${model}`
      });
    }
    
    res.json({ 
      success: true, 
      data: vehicle 
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching vehicle' 
    });
  }
});

// Get all unique makes
app.get('/api/vehicles/makes/list', async (req, res) => {
  try {
    const makes = await Vehicle.distinct('make');
    res.json({ 
      success: true, 
      count: makes.length,
      data: makes.sort()
    });
  } catch (error) {
    console.error('Error fetching makes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching makes' 
    });
  }
});

// Chatbot Routes
const chatbotRoutes = require('./routes/chatbot');
app.use('/api/chatbot', chatbotRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

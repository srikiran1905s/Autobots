const mongoose = require('mongoose');

const ChatImageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional: link to user if authenticated
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  base64Data: {
    type: String,
    required: false // Store base64 for easy retrieval
  },
  prompt: {
    type: String,
    required: false
  },
  aiResponse: {
    type: String,
    required: false
  },
  context: {
    vehicle: {
      make: String,
      model: String,
      year: Number,
      engine: String,
      type: String
    },
    obdCode: {
      code: String,
      meaning: String,
      possible_causes: [String]
    }
  },
  metadata: {
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    sessionId: String,
    ipAddress: String,
    userAgent: String
  },
  tags: [String], // e.g., 'engine', 'dashboard', 'obd-screen', 'damage'
  analysis: {
    identifiedIssues: [String],
    severity: {
      type: String,
      enum: ['minor', 'moderate', 'critical', 'unknown'],
      default: 'unknown'
    },
    recommendations: [String]
  }
}, {
  timestamps: true
});

// Index for faster queries
ChatImageSchema.index({ userId: 1, createdAt: -1 });
ChatImageSchema.index({ 'metadata.sessionId': 1 });
ChatImageSchema.index({ tags: 1 });

module.exports = mongoose.model('ChatImage', ChatImageSchema);

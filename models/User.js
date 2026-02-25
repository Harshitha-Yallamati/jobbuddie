const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  resumePath: {
    type: String,
    default: ''
  },
  skills: [{
    name: String,
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Beginner'
    }
  }],
  experience: {
    type: String,
    enum: ['Entry', 'Mid', 'Senior', 'Executive'],
    default: 'Entry'
  },
  preferredLocation: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for faster querying
userSchema.index({ email: 1 });
userSchema.index({ skills: 1 });

module.exports = mongoose.model('User', userSchema);

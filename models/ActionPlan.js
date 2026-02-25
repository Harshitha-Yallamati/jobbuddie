const mongoose = require('mongoose');

const actionPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  goals: [{
    description: String,
    targetDate: Date,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  recommendedJobs: [{
    title: String,
    company: String,
    matchScore: Number,
    skills: [String],
    applied: {
      type: Boolean,
      default: false
    },
    applicationDate: Date
  }],
  skillGaps: [{
    skill: String,
    importance: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    resources: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['Course', 'Article', 'Video', 'Book', 'Other'],
        default: 'Course'
      },
      completed: {
        type: Boolean,
        default: false
      }
    }]
  }],
  notes: {
    type: String,
    trim: true
  },
  pdfPath: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
actionPlanSchema.index({ userId: 1, isActive: 1 });
actionPlanSchema.index({ 'recommendedJobs.applied': 1 });

// Add a virtual for the user
actionPlanSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtuals are included when converting to JSON
actionPlanSchema.set('toJSON', { virtuals: true });
actionPlanSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('ActionPlan', actionPlanSchema);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const connectDB = require('./config/db');
const User = require('./models/User');
const ActionPlan = require('./models/ActionPlan');
const { analyzeResume, getSkillRecommendations, getJobMatches } = require('./controllers/jobController');
const { generatePDF, generateActionPlanHTML } = require('./utils/pdfGenerator');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Set port from environment or default to 3001
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-render-app-url.onrender.com', 'http://localhost:3000'] 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  app.use(express.static('.'));
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // In production, use the system's temp directory
        const uploadDir = process.env.NODE_ENV === 'production' 
            ? os.tmpdir() 
            : './uploads';
            
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename with timestamp and original name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx|txt/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Resume analysis endpoint
app.post('/api/analyze-resume', upload.single('resume'), analyzeResume);

// Skill recommendations endpoint
app.post('/api/skill-recommendations', getSkillRecommendations);

// Job matching endpoint
app.post('/api/job-matches', getJobMatches);

// User profile endpoints
app.post('/api/user/profile', (req, res) => {
    // Store user profile data
    const { name, email, skills, experience, education } = req.body;
    
    // In a real app, this would save to a database
    const userProfile = {
        id: Date.now(),
        name,
        email,
        skills: skills || [],
        experience: experience || '',
        education: education || '',
        createdAt: new Date()
    };
    
    res.json({
        success: true,
        message: 'Profile created successfully',
        profile: userProfile
    });
});

// Get trending skills endpoint
app.get('/api/trending-skills', (req, res) => {
    const trendingSkills = [
        { name: 'JavaScript', demand: 95, growth: '+15%' },
        { name: 'Python', demand: 92, growth: '+20%' },
        { name: 'React', demand: 88, growth: '+25%' },
        { name: 'Node.js', demand: 85, growth: '+18%' },
        { name: 'AWS', demand: 90, growth: '+30%' },
        { name: 'Docker', demand: 82, growth: '+22%' },
        { name: 'Machine Learning', demand: 87, growth: '+35%' },
        { name: 'TypeScript', demand: 80, growth: '+28%' }
    ];
    
    res.json({
        success: true,
        skills: trendingSkills
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File too large. Maximum size is 5MB.'
            });
        }
    }
    
    res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`JobBuddy server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Create public/downloads directory if it doesn't exist
    const dir = path.join(__dirname, 'public', 'downloads');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

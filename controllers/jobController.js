const fs = require('fs');
const path = require('path');

// Mock data for demonstration - in a real app, this would come from a database
const skillsDatabase = {
    'javascript': {
        category: 'Programming',
        level: 'High Demand',
        relatedSkills: ['React', 'Node.js', 'TypeScript', 'Vue.js'],
        jobTitles: ['Frontend Developer', 'Full Stack Developer', 'Web Developer']
    },
    'python': {
        category: 'Programming',
        level: 'High Demand',
        relatedSkills: ['Django', 'Flask', 'Machine Learning', 'Data Science'],
        jobTitles: ['Backend Developer', 'Data Scientist', 'ML Engineer']
    },
    'react': {
        category: 'Frontend Framework',
        level: 'High Demand',
        relatedSkills: ['JavaScript', 'Redux', 'Next.js', 'TypeScript'],
        jobTitles: ['React Developer', 'Frontend Developer', 'UI Developer']
    },
    'node.js': {
        category: 'Backend Technology',
        level: 'High Demand',
        relatedSkills: ['Express.js', 'MongoDB', 'JavaScript', 'REST APIs'],
        jobTitles: ['Backend Developer', 'Full Stack Developer', 'API Developer']
    }
};

const jobsDatabase = [
    {
        id: 1,
        title: 'Frontend Developer',
        company: 'TechCorp',
        location: 'Remote',
        salary: '$60,000 - $80,000',
        requiredSkills: ['JavaScript', 'React', 'CSS', 'HTML'],
        experience: 'Entry Level',
        description: 'Join our team to build amazing user interfaces'
    },
    {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'New York, NY',
        salary: '$70,000 - $90,000',
        requiredSkills: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
        experience: '1-3 years',
        description: 'Work on both frontend and backend technologies'
    },
    {
        id: 3,
        title: 'Data Analyst',
        company: 'DataCorp',
        location: 'San Francisco, CA',
        salary: '$65,000 - $85,000',
        requiredSkills: ['Python', 'SQL', 'Excel', 'Tableau'],
        experience: 'Entry Level',
        description: 'Analyze data to drive business decisions'
    }
];

// Analyze resume function
const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No resume file uploaded'
            });
        }

        const filePath = req.file.path;
        const fileExtension = path.extname(req.file.originalname).toLowerCase();

        // Mock resume analysis - in a real app, you'd use OCR/PDF parsing
        let extractedText = '';
        
        if (fileExtension === '.txt') {
            extractedText = fs.readFileSync(filePath, 'utf8');
        } else {
            // For PDF/DOC files, this would require additional libraries like pdf-parse
            extractedText = 'Mock extracted text containing JavaScript, React, Node.js, Python skills and 2 years experience';
        }

        // Extract skills from text (simplified)
        const detectedSkills = extractSkillsFromText(extractedText);
        const experienceLevel = extractExperienceLevel(extractedText);
        
        // Generate analysis report
        const analysis = {
            detectedSkills,
            experienceLevel,
            strengthAreas: getStrengthAreas(detectedSkills),
            improvementAreas: getImprovementAreas(detectedSkills),
            matchingJobs: findMatchingJobs(detectedSkills, experienceLevel),
            overallScore: calculateOverallScore(detectedSkills, experienceLevel)
        };

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.json({
            success: true,
            message: 'Resume analyzed successfully',
            analysis
        });

    } catch (error) {
        console.error('Resume analysis error:', error);
        res.status(500).json({
            success: false,
            message: 'Error analyzing resume'
        });
    }
};

// Get skill recommendations
const getSkillRecommendations = async (req, res) => {
    try {
        const { currentSkills, careerGoal, experienceLevel } = req.body;

        if (!currentSkills || !Array.isArray(currentSkills)) {
            return res.status(400).json({
                success: false,
                message: 'Current skills array is required'
            });
        }

        const recommendations = generateSkillRecommendations(
            currentSkills, 
            careerGoal, 
            experienceLevel
        );

        res.json({
            success: true,
            message: 'Skill recommendations generated',
            recommendations
        });

    } catch (error) {
        console.error('Skill recommendations error:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating skill recommendations'
        });
    }
};

// Get job matches
const getJobMatches = async (req, res) => {
    try {
        const { skills, location, experienceLevel } = req.body;

        if (!skills || !Array.isArray(skills)) {
            return res.status(400).json({
                success: false,
                message: 'Skills array is required'
            });
        }

        const matches = findJobMatches(skills, location, experienceLevel);

        res.json({
            success: true,
            message: 'Job matches found',
            matches
        });

    } catch (error) {
        console.error('Job matching error:', error);
        res.status(500).json({
            success: false,
            message: 'Error finding job matches'
        });
    }
};

// Helper functions
function extractSkillsFromText(text) {
    const skillKeywords = ['javascript', 'python', 'react', 'node.js', 'html', 'css', 'sql', 'java', 'c++'];
    const detectedSkills = [];
    
    const lowerText = text.toLowerCase();
    skillKeywords.forEach(skill => {
        if (lowerText.includes(skill)) {
            detectedSkills.push(skill);
        }
    });
    
    return detectedSkills;
}

function extractExperienceLevel(text) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('senior') || lowerText.includes('5+ years') || lowerText.includes('lead')) {
        return 'Senior';
    } else if (lowerText.includes('2-4 years') || lowerText.includes('mid-level')) {
        return 'Mid-level';
    } else {
        return 'Entry Level';
    }
}

function getStrengthAreas(skills) {
    const strengths = [];
    
    if (skills.includes('javascript') && skills.includes('react')) {
        strengths.push('Frontend Development');
    }
    if (skills.includes('python')) {
        strengths.push('Backend Development');
    }
    if (skills.includes('sql')) {
        strengths.push('Database Management');
    }
    
    return strengths.length > 0 ? strengths : ['General Programming'];
}

function getImprovementAreas(skills) {
    const improvements = [];
    
    if (!skills.includes('javascript')) {
        improvements.push('JavaScript fundamentals');
    }
    if (!skills.includes('react') && skills.includes('javascript')) {
        improvements.push('Modern frontend frameworks');
    }
    if (!skills.includes('sql')) {
        improvements.push('Database skills');
    }
    
    return improvements;
}

function findMatchingJobs(skills, experienceLevel) {
    return jobsDatabase.filter(job => {
        const skillMatch = job.requiredSkills.some(skill => 
            skills.includes(skill.toLowerCase())
        );
        const levelMatch = job.experience === experienceLevel || job.experience === 'Entry Level';
        
        return skillMatch && levelMatch;
    }).slice(0, 3); // Return top 3 matches
}

function calculateOverallScore(skills, experienceLevel) {
    let score = skills.length * 10; // Base score from skills
    
    if (experienceLevel === 'Senior') score += 30;
    else if (experienceLevel === 'Mid-level') score += 20;
    else score += 10;
    
    return Math.min(score, 100); // Cap at 100
}

function generateSkillRecommendations(currentSkills, careerGoal, experienceLevel) {
    const recommendations = [];
    
    // Basic recommendations based on current skills
    currentSkills.forEach(skill => {
        const skillInfo = skillsDatabase[skill.toLowerCase()];
        if (skillInfo) {
            skillInfo.relatedSkills.forEach(relatedSkill => {
                if (!currentSkills.includes(relatedSkill) && 
                    !recommendations.find(r => r.skill === relatedSkill)) {
                    recommendations.push({
                        skill: relatedSkill,
                        priority: 'High',
                        reason: `Complements your ${skill} skills`,
                        estimatedTime: '2-3 months'
                    });
                }
            });
        }
    });
    
    // Add trending skills
    const trendingSkills = ['TypeScript', 'Docker', 'AWS', 'Machine Learning'];
    trendingSkills.forEach(skill => {
        if (!currentSkills.includes(skill) && 
            !recommendations.find(r => r.skill === skill)) {
            recommendations.push({
                skill,
                priority: 'Medium',
                reason: 'High market demand',
                estimatedTime: '1-2 months'
            });
        }
    });
    
    return recommendations.slice(0, 6); // Return top 6 recommendations
}

function findJobMatches(skills, location, experienceLevel) {
    let matches = jobsDatabase.filter(job => {
        const skillMatch = job.requiredSkills.some(skill => 
            skills.includes(skill.toLowerCase())
        );
        
        const locationMatch = !location || 
            job.location.toLowerCase().includes(location.toLowerCase()) ||
            job.location === 'Remote';
            
        const levelMatch = !experienceLevel || 
            job.experience === experienceLevel || 
            job.experience === 'Entry Level';
        
        return skillMatch && locationMatch && levelMatch;
    });
    
    // Calculate match percentage
    matches = matches.map(job => {
        const matchingSkills = job.requiredSkills.filter(skill => 
            skills.includes(skill.toLowerCase())
        );
        const matchPercentage = Math.round((matchingSkills.length / job.requiredSkills.length) * 100);
        
        return {
            ...job,
            matchPercentage,
            matchingSkills
        };
    });
    
    // Sort by match percentage
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    return matches;
}

module.exports = {
    analyzeResume,
    getSkillRecommendations,
    getJobMatches
};

// Skill Recommendations JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page functionality
    initializeRecommendations();
    setupInteractiveElements();
    loadUserData();
});

function initializeRecommendations() {
    // Animate cards on scroll
    const cards = document.querySelectorAll('.career-path-card, .skill-development-card, .insight-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 200));
    });
}

function setupInteractiveElements() {
    // Career path card interactions
    setupCareerPathCards();
    
    // Skill development interactions
    setupSkillDevelopmentCards();
    
    // Action plan interactions
    setupActionPlan();
    
    // Progress tracking
    setupProgressTracking();
}

function setupCareerPathCards() {
    const careerCards = document.querySelectorAll('.career-path-card');
    
    careerCards.forEach(card => {
        const viewLearningBtn = card.querySelector('.btn-primary');
        const findJobsBtn = card.querySelector('.btn-secondary');
        
        if (viewLearningBtn) {
            viewLearningBtn.addEventListener('click', function() {
                const careerTitle = card.querySelector('h3').textContent;
                showLearningPathModal(careerTitle);
            });
        }
        
        if (findJobsBtn) {
            findJobsBtn.addEventListener('click', function() {
                const careerTitle = card.querySelector('h3').textContent;
                searchJobs(careerTitle);
            });
        }
        
        // Add hover effects for skill tags
        const skillTags = card.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
}

function setupSkillDevelopmentCards() {
    const skillCards = document.querySelectorAll('.skill-development-card');
    
    skillCards.forEach(card => {
        const startLearningBtn = card.querySelector('.btn-primary');
        const viewResourcesBtn = card.querySelector('.btn-outline');
        
        if (startLearningBtn) {
            startLearningBtn.addEventListener('click', function() {
                const skillTitle = card.querySelector('h3').textContent;
                startLearningPath(skillTitle);
            });
        }
        
        if (viewResourcesBtn) {
            viewResourcesBtn.addEventListener('click', function() {
                const skillTitle = card.querySelector('h3').textContent;
                showResources(skillTitle);
            });
        }
        
        // Add progress indicators to path items
        const pathItems = card.querySelectorAll('.path-item');
        pathItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                togglePathItemCompletion(this);
            });
            
            // Add completion state from localStorage
            const skillTitle = card.querySelector('h3').textContent;
            const isCompleted = getPathItemCompletion(skillTitle, index);
            if (isCompleted) {
                item.classList.add('completed');
                item.style.opacity = '0.7';
                item.style.textDecoration = 'line-through';
            }
        });
    });
}

function setupActionPlan() {
    const downloadBtn = document.querySelector('.action-plan-cta .btn-primary');
    const scheduleBtn = document.querySelector('.action-plan-cta .btn-secondary');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadActionPlan();
        });
    }
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            scheduleMentorship();
        });
    }
    
    // Make timeline items interactive
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            expandTimelineItem(this);
        });
    });
}

function setupProgressTracking() {
    // Track user interactions for analytics
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            trackUserAction('button_click', {
                button_text: e.target.textContent.trim(),
                page: 'recommendations'
            });
        }
    });
    
    // Update progress indicators
    updateOverallProgress();
}

function showLearningPathModal(careerTitle) {
    // Create and show modal with detailed learning path
    const modal = createModal(`Learning Path: ${careerTitle}`, getLearningPathContent(careerTitle));
    document.body.appendChild(modal);
    
    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

function searchJobs(careerTitle) {
    // Simulate job search functionality
    showNotification(`Searching for ${careerTitle} positions in your area...`, 'info');
    
    // In a real application, this would redirect to a job search page
    setTimeout(() => {
        showNotification(`Found 23 ${careerTitle} positions! Check your email for details.`, 'success');
    }, 2000);
}

function startLearningPath(skillTitle) {
    // Simulate starting a learning path
    showNotification(`Starting ${skillTitle} learning path...`, 'info');
    
    // Update progress tracking
    updateLearningProgress(skillTitle, 0);
    
    setTimeout(() => {
        showNotification(`${skillTitle} course enrolled! Check your dashboard for progress.`, 'success');
    }, 1500);
}

function showResources(skillTitle) {
    const resources = getSkillResources(skillTitle);
    const modal = createModal(`${skillTitle} Resources`, resources);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

function togglePathItemCompletion(pathItem) {
    const isCompleted = pathItem.classList.contains('completed');
    
    if (isCompleted) {
        pathItem.classList.remove('completed');
        pathItem.style.opacity = '1';
        pathItem.style.textDecoration = 'none';
    } else {
        pathItem.classList.add('completed');
        pathItem.style.opacity = '0.7';
        pathItem.style.textDecoration = 'line-through';
        
        // Add checkmark animation
        const icon = pathItem.querySelector('i');
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#10b981';
    }
    
    // Save completion state
    const skillCard = pathItem.closest('.skill-development-card');
    const skillTitle = skillCard.querySelector('h3').textContent;
    const pathItems = skillCard.querySelectorAll('.path-item');
    const index = Array.from(pathItems).indexOf(pathItem);
    
    savePathItemCompletion(skillTitle, index, !isCompleted);
    updateOverallProgress();
}

function downloadActionPlan() {
    // Simulate PDF download
    showNotification('Generating your personalized action plan...', 'info');
    
    setTimeout(() => {
        // Create a simple text file with action plan content
        const actionPlanContent = generateActionPlanText();
        downloadTextFile('JobBuddy_Action_Plan.txt', actionPlanContent);
        showNotification('Action plan downloaded successfully!', 'success');
    }, 2000);
}

function scheduleMentorship() {
    // Simulate scheduling functionality
    showNotification('Redirecting to mentorship scheduling...', 'info');
    
    setTimeout(() => {
        showNotification('Mentorship call scheduled for next week! Check your email for details.', 'success');
    }, 1500);
}

function expandTimelineItem(timelineItem) {
    const content = timelineItem.querySelector('.timeline-content');
    const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';
    
    if (isExpanded) {
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.overflow = 'visible';
    }
}

// Utility functions
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 style="margin: 0; color: #1f2937;">${title}</h2>
                <button class="close-modal" style="
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #6b7280;
                ">&times;</button>
            </div>
            <div>${content}</div>
        </div>
    `;
    
    // Close modal functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    return modal;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    const colors = {
        info: '#2563eb',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function loadUserData() {
    // Load user data from localStorage or API
    const userData = JSON.parse(localStorage.getItem('jobBuddyFormData') || '{}');
    
    if (userData.careerInterests) {
        // Update page content based on user data
        console.log('User data loaded:', userData);
    }
}

function trackUserAction(action, data) {
    // Track user interactions for analytics
    console.log('User action:', action, data);
    
    // In a real application, this would send data to analytics service
    const analytics = JSON.parse(localStorage.getItem('jobBuddyAnalytics') || '[]');
    analytics.push({
        action,
        data,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('jobBuddyAnalytics', JSON.stringify(analytics));
}

function updateOverallProgress() {
    // Calculate and update overall progress
    const totalPathItems = document.querySelectorAll('.path-item').length;
    const completedItems = document.querySelectorAll('.path-item.completed').length;
    const progress = Math.round((completedItems / totalPathItems) * 100);
    
    console.log(`Overall progress: ${progress}%`);
    
    // Update progress in localStorage
    localStorage.setItem('jobBuddyProgress', progress.toString());
}

// Helper functions for data persistence
function getPathItemCompletion(skillTitle, index) {
    const completions = JSON.parse(localStorage.getItem('jobBuddyCompletions') || '{}');
    return completions[`${skillTitle}_${index}`] || false;
}

function savePathItemCompletion(skillTitle, index, completed) {
    const completions = JSON.parse(localStorage.getItem('jobBuddyCompletions') || '{}');
    completions[`${skillTitle}_${index}`] = completed;
    localStorage.setItem('jobBuddyCompletions', JSON.stringify(completions));
}

function updateLearningProgress(skillTitle, progress) {
    const progressData = JSON.parse(localStorage.getItem('jobBuddyLearningProgress') || '{}');
    progressData[skillTitle] = progress;
    localStorage.setItem('jobBuddyLearningProgress', JSON.stringify(progressData));
}

function getLearningPathContent(careerTitle) {
    const paths = {
        'Full-Stack Web Developer': `
            <div style="line-height: 1.6;">
                <h3>Complete Learning Path (6-8 months)</h3>
                <div style="margin: 1rem 0;">
                    <h4>Phase 1: Frontend Fundamentals (2 months)</h4>
                    <ul>
                        <li>HTML5 & CSS3 Advanced Concepts</li>
                        <li>JavaScript ES6+ Features</li>
                        <li>Responsive Design & CSS Grid/Flexbox</li>
                        <li>Version Control with Git</li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h4>Phase 2: React Development (2 months)</h4>
                    <ul>
                        <li>React Components & JSX</li>
                        <li>State Management & Hooks</li>
                        <li>React Router & Navigation</li>
                        <li>API Integration</li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h4>Phase 3: Backend Development (2 months)</h4>
                    <ul>
                        <li>Node.js & Express.js</li>
                        <li>Database Design (MongoDB/PostgreSQL)</li>
                        <li>RESTful API Development</li>
                        <li>Authentication & Security</li>
                    </ul>
                </div>
            </div>
        `,
        'Mobile App Developer': `
            <div style="line-height: 1.6;">
                <h3>Mobile Development Path (5-7 months)</h3>
                <div style="margin: 1rem 0;">
                    <h4>Phase 1: Mobile Fundamentals (1 month)</h4>
                    <ul>
                        <li>Mobile Design Principles</li>
                        <li>Platform Guidelines (iOS/Android)</li>
                        <li>User Experience for Mobile</li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h4>Phase 2: React Native (3 months)</h4>
                    <ul>
                        <li>React Native Components</li>
                        <li>Navigation & State Management</li>
                        <li>Native Device Features</li>
                        <li>App Store Deployment</li>
                    </ul>
                </div>
            </div>
        `,
        'Data Analyst': `
            <div style="line-height: 1.6;">
                <h3>Data Analysis Path (4-6 months)</h3>
                <div style="margin: 1rem 0;">
                    <h4>Phase 1: Statistics & Excel (1 month)</h4>
                    <ul>
                        <li>Statistical Analysis Fundamentals</li>
                        <li>Advanced Excel Functions</li>
                        <li>Data Visualization Basics</li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h4>Phase 2: Python & SQL (2 months)</h4>
                    <ul>
                        <li>Python for Data Analysis</li>
                        <li>SQL Query Optimization</li>
                        <li>Pandas & NumPy Libraries</li>
                    </ul>
                </div>
            </div>
        `
    };
    
    return paths[careerTitle] || '<p>Detailed learning path coming soon!</p>';
}

function getSkillResources(skillTitle) {
    const resources = {
        'React.js Development': `
            <div style="line-height: 1.6;">
                <h3>Recommended Resources</h3>
                <div style="margin: 1rem 0;">
                    <h4>Free Courses</h4>
                    <ul>
                        <li><a href="#" target="_blank">React Official Tutorial</a></li>
                        <li><a href="#" target="_blank">freeCodeCamp React Course</a></li>
                        <li><a href="#" target="_blank">React Crash Course (YouTube)</a></li>
                    </ul>
                </div>
                <div style="margin: 1rem 0;">
                    <h4>Practice Projects</h4>
                    <ul>
                        <li>Todo List Application</li>
                        <li>Weather App with API</li>
                        <li>E-commerce Product Catalog</li>
                    </ul>
                </div>
            </div>
        `,
        'Backend Development': `
            <div style="line-height: 1.6;">
                <h3>Backend Learning Resources</h3>
                <div style="margin: 1rem 0;">
                    <h4>Courses</h4>
                    <ul>
                        <li><a href="#" target="_blank">Node.js Complete Guide</a></li>
                        <li><a href="#" target="_blank">Express.js Fundamentals</a></li>
                        <li><a href="#" target="_blank">Database Design Principles</a></li>
                    </ul>
                </div>
            </div>
        `,
        'Cloud Technologies': `
            <div style="line-height: 1.6;">
                <h3>Cloud Learning Path</h3>
                <div style="margin: 1rem 0;">
                    <h4>Getting Started</h4>
                    <ul>
                        <li><a href="#" target="_blank">AWS Cloud Practitioner</a></li>
                        <li><a href="#" target="_blank">Azure Fundamentals</a></li>
                        <li><a href="#" target="_blank">Google Cloud Basics</a></li>
                    </ul>
                </div>
            </div>
        `
    };
    
    return resources[skillTitle] || '<p>Resources coming soon!</p>';
}

function generateActionPlanText() {
    return `
JobBuddy - Personalized 90-Day Action Plan
==========================================

Generated on: ${new Date().toLocaleDateString()}

30-Day Goals (Foundation Building):
- Complete React.js fundamentals course
- Build your first React project
- Update your LinkedIn profile
- Start networking in tech communities

60-Day Goals (Skill Enhancement):
- Learn Node.js and Express.js
- Build a full-stack application
- Contribute to open-source projects
- Apply to 5-10 relevant positions

90-Day Goals (Career Launch):
- Complete portfolio with 3 projects
- Prepare for technical interviews
- Attend tech meetups and conferences
- Secure your first developer role

Daily Recommendations:
- Spend 2-3 hours on coding practice
- Read tech articles and stay updated
- Network with 1-2 professionals weekly
- Document your learning journey

Resources:
- Visit jobbuddy.com for updates
- Join our community Discord
- Schedule mentorship calls
- Track progress in your dashboard

Good luck on your career journey!
    `;
}

function downloadTextFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

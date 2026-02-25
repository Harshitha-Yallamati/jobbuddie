// Resume Analyzer JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('resume-file');
    const uploadedFile = document.getElementById('uploaded-file');
    const removeFileBtn = document.getElementById('remove-file');
    const nextStep1Btn = document.getElementById('next-step-1');
    const prevStep2Btn = document.getElementById('prev-step-2');
    const analyzeBtn = document.getElementById('analyze-resume');
    const uploadLink = document.querySelector('.upload-link');

    // Step elements
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    
    let currentStep = 1;
    let uploadedFileData = null;

    // File upload functionality
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadLink.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    // Handle file upload
    function handleFileUpload(file) {
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a PDF, DOC, or DOCX file.');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB.');
            return;
        }

        // Store file data
        uploadedFileData = file;

        // Update UI
        uploadArea.style.display = 'none';
        uploadedFile.style.display = 'block';
        
        document.querySelector('.file-name').textContent = file.name;
        document.querySelector('.file-size').textContent = formatFileSize(file.size);
        
        nextStep1Btn.disabled = false;
    }

    // Remove file
    removeFileBtn.addEventListener('click', () => {
        uploadedFileData = null;
        uploadArea.style.display = 'block';
        uploadedFile.style.display = 'none';
        fileInput.value = '';
        nextStep1Btn.disabled = true;
    });

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Step navigation
    nextStep1Btn.addEventListener('click', () => {
        if (uploadedFileData) {
            goToStep(2);
        }
    });

    prevStep2Btn.addEventListener('click', () => {
        goToStep(1);
    });

    analyzeBtn.addEventListener('click', () => {
        if (validateForm()) {
            goToStep(3);
            startAnalysis();
        }
    });

    // Go to specific step
    function goToStep(stepNumber) {
        // Update step indicators
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
            } else if (index + 1 === stepNumber) {
                step.classList.add('active');
            }
        });

        // Update form steps
        formSteps.forEach((formStep, index) => {
            formStep.classList.remove('active');
            if (index + 1 === stepNumber) {
                formStep.classList.add('active');
            }
        });

        currentStep = stepNumber;
    }

    // Validate form
    function validateForm() {
        const careerInterests = document.getElementById('career-interests').value.trim();
        const preferredLocation = document.getElementById('preferred-location').value;
        const experienceLevel = document.getElementById('experience-level').value;

        if (!careerInterests) {
            alert('Please describe your career interests.');
            document.getElementById('career-interests').focus();
            return false;
        }

        if (!preferredLocation) {
            alert('Please select your preferred work location.');
            document.getElementById('preferred-location').focus();
            return false;
        }

        if (!experienceLevel) {
            alert('Please select your experience level.');
            document.getElementById('experience-level').focus();
            return false;
        }

        return true;
    }

    // Start analysis simulation
    function startAnalysis() {
        const loadingSteps = document.querySelectorAll('.loading-step');
        let currentLoadingStep = 0;

        // Reset loading steps
        loadingSteps.forEach((step, index) => {
            const icon = step.querySelector('i');
            if (icon) {  
                if (index === 0) {
                    icon.className = 'fas fa-check';
                    step.style.color = '#10b981';
                } else {
                    icon.className = '';
                    step.style.color = '#6b7280';
                }
            }
        });

        // Simulate analysis steps
        const stepInterval = setInterval(() => {
            currentLoadingStep++;
            
            if (currentLoadingStep < loadingSteps.length) {
                const step = loadingSteps[currentLoadingStep];
                const icon = step.querySelector('i');
                
                // Update previous step
                if (currentLoadingStep > 0) {
                    const prevStep = loadingSteps[currentLoadingStep - 1];
                    const prevIcon = prevStep.querySelector('i');
                    if (prevIcon) {
                        prevIcon.className = 'fas fa-check';
                        prevIcon.parentElement.style.color = '#10b981';
                    }
                }

                // Update current step
                if (icon) {
                    icon.className = 'fas fa-spinner fa-spin';
                    step.style.color = '#3b82f6';
                }
            } else {
                clearInterval(stepInterval);
                
                // Complete all steps
                loadingSteps.forEach(step => {
                    const icon = step.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-check';
                        step.style.color = '#10b981';
                    }
                });

                // Show completion after a short delay
                setTimeout(() => {
                    const loadingSection = document.getElementById('analysis-loading');
                    const completeSection = document.getElementById('analysis-complete');
                    
                    if (loadingSection && completeSection) {
                        loadingSection.style.display = 'none';
                        completeSection.style.display = 'block';
                    }
                }, 1000);
            }
        }, 1500);
    }

    // Form validation helpers
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });

    // Add form data collection for future backend integration
    function collectFormData() {
        const formData = {
            file: uploadedFileData,
            careerInterests: document.getElementById('career-interests').value,
            preferredLocation: document.getElementById('preferred-location').value,
            experienceLevel: document.getElementById('experience-level').value,
            workEnvironment: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value),
            learningGoals: document.getElementById('learning-goals').value
        };
        
        console.log('Form data collected:', formData);
        return formData;
    }

    // Store form data when analysis starts
    analyzeBtn.addEventListener('click', () => {
        if (validateForm()) {
            const formData = collectFormData();
            localStorage.setItem('jobBuddyFormData', JSON.stringify(formData));
            
            // Mock data for the action plan (in a real app, this would come from the backend)
            const actionPlanData = {
                name: 'John Doe', // This would come from user profile
                email: 'john@example.com',
                location: formData.preferredLocation,
                experienceLevel: formData.experienceLevel,
                skills: [
                    { name: 'JavaScript', level: 'Intermediate' },
                    { name: 'React', level: 'Beginner' },
                    { name: 'Node.js', level: 'Intermediate' }
                ],
                recommendedJobs: [
                    {
                        title: 'Frontend Developer',
                        company: 'TechCorp',
                        salary: '$70,000 - $90,000',
                        skills: ['JavaScript', 'React', 'CSS']
                    },
                    {
                        title: 'Full Stack Developer',
                        company: 'WebSolutions Inc',
                        salary: '$80,000 - $110,000',
                        skills: ['JavaScript', 'Node.js', 'React', 'MongoDB']
                    }
                ],
                skillGaps: [
                    {
                        skill: 'TypeScript',
                        description: 'Consider learning TypeScript as it\'s widely used in modern web development'
                    },
                    {
                        skill: 'AWS',
                        description: 'Cloud computing skills are in high demand'
                    }
                ]
            };
            
            // Store the action plan data for later use
            localStorage.setItem('actionPlanData', JSON.stringify(actionPlanData));
        }
    });
    
    // Add event listener for the download button
    document.addEventListener('click', async (e) => {
        if (e.target && e.target.id === 'download-action-plan') {
            e.preventDefault();
            const downloadBtn = e.target;
            const originalText = downloadBtn.innerHTML;
            
            try {
                downloadBtn.disabled = true;
                downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
                
                // Get the action plan data from localStorage
                const actionPlanData = JSON.parse(localStorage.getItem('actionPlanData'));
                
                if (!actionPlanData) {
                    throw new Error('No action plan data found. Please complete the analysis first.');
                }
                
                // Send request to generate PDF
                const response = await fetch('/api/generate-pdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userData: actionPlanData })
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to generate PDF');
                }
                
                const data = await response.json();
                
                // Create a temporary link to trigger the download
                const downloadLink = document.createElement('a');
                downloadLink.href = data.downloadUrl;
                downloadLink.download = `Career-Action-Plan-${new Date().toISOString().split('T')[0]}.pdf`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                // Show success message
                showNotification('PDF downloaded successfully!', 'success');
                
            } catch (error) {
                console.error('Error downloading PDF:', error);
                showNotification(error.message || 'Failed to download PDF', 'error');
            } finally {
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = originalText;
            }
        }
    });
    
    // Helper function to show notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
});

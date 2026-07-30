const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const careerPathsDatabase = [
    {
        id: 'frontend-developer',
        title: 'Frontend Developer',
        requiredSkills: ['JavaScript', 'HTML', 'CSS', 'React', 'Git'],
        preferredSkills: ['TypeScript', 'Redux', 'Next.js', 'REST APIs', 'UI/UX'],
        description: 'Build responsive, accessible user interfaces for web applications.',
        experience: 'Entry Level'
    },
    {
        id: 'react-developer',
        title: 'React Developer',
        requiredSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git'],
        preferredSkills: ['TypeScript', 'Redux', 'Next.js', 'REST APIs'],
        description: 'Create component-driven applications using React and modern frontend tooling.',
        experience: 'Entry Level'
    },
    {
        id: 'backend-developer',
        title: 'Backend Developer',
        requiredSkills: ['Node.js', 'Express.js', 'REST APIs', 'SQL', 'Git'],
        preferredSkills: ['MongoDB', 'Docker', 'AWS', 'GraphQL'],
        description: 'Design APIs, services, databases, and server-side application logic.',
        experience: 'Entry Level'
    },
    {
        id: 'nodejs-developer',
        title: 'Node.js Developer',
        requiredSkills: ['JavaScript', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB'],
        preferredSkills: ['TypeScript', 'Docker', 'AWS', 'GraphQL'],
        description: 'Develop scalable JavaScript services and API integrations with Node.js.',
        experience: 'Entry Level'
    },
    {
        id: 'full-stack-developer',
        title: 'Full Stack Developer',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'REST APIs', 'SQL'],
        preferredSkills: ['TypeScript', 'MongoDB', 'Docker', 'AWS', 'Git'],
        description: 'Work across frontend, backend, and data layers to deliver complete products.',
        experience: 'Junior'
    },
    {
        id: 'python-developer',
        title: 'Python Developer',
        requiredSkills: ['Python', 'SQL', 'Git', 'REST APIs'],
        preferredSkills: ['Django', 'Flask', 'Docker', 'AWS'],
        description: 'Build applications, automation, and backend services using Python.',
        experience: 'Entry Level'
    },
    {
        id: 'django-developer',
        title: 'Django Developer',
        requiredSkills: ['Python', 'Django', 'SQL', 'REST APIs', 'Git'],
        preferredSkills: ['Docker', 'AWS', 'JavaScript', 'HTML'],
        description: 'Create secure, database-backed web applications with Django.',
        experience: 'Junior'
    },
    {
        id: 'data-analyst',
        title: 'Data Analyst',
        requiredSkills: ['SQL', 'Excel', 'Data Science'],
        preferredSkills: ['Python', 'Tableau', 'Power BI', 'Communication'],
        description: 'Turn business data into clear insights, dashboards, and recommendations.',
        experience: 'Entry Level'
    },
    {
        id: 'business-analyst',
        title: 'Business Analyst',
        requiredSkills: ['Excel', 'SQL', 'Communication', 'Agile'],
        preferredSkills: ['Tableau', 'Power BI', 'Data Science'],
        description: 'Translate business needs into requirements, reports, and process improvements.',
        experience: 'Entry Level'
    },
    {
        id: 'data-scientist',
        title: 'Data Scientist',
        requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Data Science'],
        preferredSkills: ['Tableau', 'Power BI', 'AWS', 'Communication'],
        description: 'Use statistics, machine learning, and data storytelling to solve complex problems.',
        experience: 'Junior'
    },
    {
        id: 'machine-learning-engineer',
        title: 'Machine Learning Engineer',
        requiredSkills: ['Python', 'Machine Learning', 'Data Science', 'Git'],
        preferredSkills: ['Docker', 'AWS', 'SQL', 'REST APIs'],
        description: 'Build, deploy, and maintain machine learning systems in production.',
        experience: 'Mid-level'
    },
    {
        id: 'cloud-engineer',
        title: 'Cloud Engineer',
        requiredSkills: ['AWS', 'Docker', 'Git'],
        preferredSkills: ['Kubernetes', 'Node.js', 'Python', 'SQL'],
        description: 'Configure cloud infrastructure, deployment pipelines, and reliable services.',
        experience: 'Junior'
    },
    {
        id: 'devops-engineer',
        title: 'DevOps Engineer',
        requiredSkills: ['Docker', 'Git', 'AWS'],
        preferredSkills: ['Kubernetes', 'Node.js', 'Python', 'Agile'],
        description: 'Improve build, release, monitoring, and infrastructure automation workflows.',
        experience: 'Junior'
    },
    {
        id: 'database-developer',
        title: 'Database Developer',
        requiredSkills: ['SQL', 'MongoDB', 'Git'],
        preferredSkills: ['Python', 'Node.js', 'AWS', 'Data Science'],
        description: 'Design schemas, queries, storage models, and data access patterns.',
        experience: 'Entry Level'
    },
    {
        id: 'api-developer',
        title: 'API Developer',
        requiredSkills: ['REST APIs', 'Node.js', 'Express.js', 'SQL'],
        preferredSkills: ['GraphQL', 'MongoDB', 'Docker', 'AWS'],
        description: 'Build reliable APIs and integrations for web, mobile, and internal platforms.',
        experience: 'Junior'
    },
    {
        id: 'mobile-app-developer',
        title: 'Mobile App Developer',
        requiredSkills: ['JavaScript', 'React', 'REST APIs', 'Git'],
        preferredSkills: ['TypeScript', 'Firebase', 'UI/UX'],
        description: 'Develop mobile-first experiences using JavaScript and API-backed architectures.',
        experience: 'Entry Level'
    },
    {
        id: 'ui-ux-designer',
        title: 'UI/UX Designer',
        requiredSkills: ['Figma', 'UI/UX', 'Communication'],
        preferredSkills: ['HTML', 'CSS', 'React', 'Agile'],
        description: 'Research, design, prototype, and validate user-centered digital experiences.',
        experience: 'Entry Level'
    },
    {
        id: 'product-analyst',
        title: 'Product Analyst',
        requiredSkills: ['SQL', 'Excel', 'Communication', 'Data Science'],
        preferredSkills: ['Tableau', 'Power BI', 'Agile'],
        description: 'Analyze product usage and customer behavior to guide roadmap decisions.',
        experience: 'Entry Level'
    },
    {
        id: 'qa-automation-engineer',
        title: 'QA Automation Engineer',
        requiredSkills: ['JavaScript', 'Git', 'REST APIs'],
        preferredSkills: ['Python', 'Agile', 'Docker', 'SQL'],
        description: 'Create automated tests and quality processes for reliable software delivery.',
        experience: 'Entry Level'
    },
    {
        id: 'software-engineer',
        title: 'Software Engineer',
        requiredSkills: ['JavaScript', 'Python', 'SQL', 'Git'],
        preferredSkills: ['Java', 'C++', 'REST APIs', 'Docker'],
        description: 'Solve software problems across application, data, and system boundaries.',
        experience: 'Entry Level'
    },
    {
        id: 'java-developer',
        title: 'Java Developer',
        requiredSkills: ['Java', 'SQL', 'Git', 'REST APIs'],
        preferredSkills: ['Docker', 'AWS', 'Agile'],
        description: 'Build enterprise applications and backend services using Java.',
        experience: 'Entry Level'
    },
    {
        id: 'technical-support-engineer',
        title: 'Technical Support Engineer',
        requiredSkills: ['Communication', 'SQL', 'Git'],
        preferredSkills: ['JavaScript', 'Python', 'REST APIs', 'AWS'],
        description: 'Troubleshoot technical issues, support customers, and document solutions.',
        experience: 'Entry Level'
    }
];

// Analyze resume function
const analyzeResume = async (req, res) => {
    let filePath;

    try {
        console.log('[DEBUG] ===== analyzeResume START =====');
        console.log('[DEBUG] Request received, file:', req.file ? req.file.originalname : 'NO FILE');
        
        if (!req.file) {
            console.log('[DEBUG] ERROR: No file uploaded');
            return res.status(400).json({
                success: false,
                message: 'No resume file uploaded'
            });
        }

        filePath = req.file.path;
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        console.log('[DEBUG] File path:', filePath, 'Extension:', fileExtension);
        
        console.log('[DEBUG] Calling extractTextFromResume...');
        const extractedText = await extractTextFromResume(filePath, fileExtension);
        console.log('[DEBUG] Text extracted successfully, length:', extractedText.length);
        console.log('[DEBUG] Text preview:', extractedText.substring(0, 200));

        if (!extractedText || extractedText.trim().length < 30) {
            console.log('[DEBUG] ERROR: Not enough text extracted');
            return res.status(422).json({
                success: false,
                message: 'Could not extract enough readable text from this resume. Please upload a text-based PDF, DOCX, or TXT file.'
            });
        }

        console.log('[DEBUG] Calling extractSkillsFromText...');
        const detectedSkills = extractSkillsFromText(extractedText);
        console.log('[DEBUG] Skills extracted:', detectedSkills.length, 'skills:', detectedSkills);
        
        console.log('[DEBUG] Calling extractSoftSkills...');
        const softSkills = extractSoftSkills(extractedText);
        console.log('[DEBUG] Soft skills extracted:', softSkills.length, 'skills:', softSkills);
        
        console.log('[DEBUG] Calling extractEducation...');
        const education = extractEducation(extractedText);
        console.log('[DEBUG] Education extracted:', education);
        
        console.log('[DEBUG] Calling extractProjects...');
        const projects = extractProjects(extractedText);
        console.log('[DEBUG] Projects extracted:', projects);
        
        console.log('[DEBUG] Calling extractCertifications...');
        const certifications = extractCertifications(extractedText);
        console.log('[DEBUG] Certifications extracted:', certifications);
        
        console.log('[DEBUG] Calling extractExperience...');
        const experience = extractExperience(extractedText);
        console.log('[DEBUG] Experience extracted:', experience);
        
        console.log('[DEBUG] Calling extractExperienceLevel...');
        const experienceLevel = extractExperienceLevel(extractedText, experience.totalYears);
        console.log('[DEBUG] Experience level:', experienceLevel);
        
        console.log('[DEBUG] Calling getMissingSkills...');
        const missingSkills = getMissingSkills(detectedSkills, req.body?.careerGoal || req.body?.careerInterests);
        console.log('[DEBUG] Missing skills:', missingSkills);
        
        console.log('[DEBUG] Calling getStrengthAreas...');
        const strengths = getStrengthAreas(detectedSkills, {
            education,
            projects,
            certifications,
            experience,
            text: extractedText
        });
        console.log('[DEBUG] Strengths:', strengths);
        
        console.log('[DEBUG] Calling getImprovementAreas...');
        const weaknesses = getImprovementAreas(detectedSkills, {
            education,
            projects,
            certifications,
            experience,
            text: extractedText,
            missingSkills
        });
        console.log('[DEBUG] Weaknesses:', weaknesses);
        
        console.log('[DEBUG] Calling calculateResumeScore...');
        const resumeScore = calculateResumeScore({
            detectedSkills,
            education,
            projects,
            certifications,
            experience,
            text: extractedText
        });
        console.log('[DEBUG] Resume score:', resumeScore);
        
        console.log('[DEBUG] Calling calculateATSScore...');
        const atsScore = calculateATSScore({
            detectedSkills,
            education,
            projects,
            certifications,
            experience,
            text: extractedText
        });
        console.log('[DEBUG] ATS score:', atsScore);
        
        console.log('[DEBUG] Calling extractCareerInterests...');
        const extractedInterests = extractCareerInterests({
            detectedSkills,
            education,
            projects,
            experience,
            experienceLevel
        });
        console.log('[DEBUG] Extracted interests:', extractedInterests);
        
        console.log('[DEBUG] Calling inferPreferredLocation...');
        const extractedLocation = inferPreferredLocation(extractedText);
        console.log('[DEBUG] Extracted location:', extractedLocation);
        
        console.log('[DEBUG] Calling inferWorkEnvironment...');
        const extractedWorkEnvironment = inferWorkEnvironment(extractedText);
        console.log('[DEBUG] Extracted work environment:', extractedWorkEnvironment);
        
        console.log('[DEBUG] Calling inferLearningGoals...');
        const extractedLearningGoals = inferLearningGoals(detectedSkills, missingSkills);
        console.log('[DEBUG] Extracted learning goals:', extractedLearningGoals);

        console.log('[DEBUG] Calling generateDynamicCareerPaths...');
        const careerRecommendations = generateDynamicCareerPaths({
            detectedSkills,
            softSkills,
            experienceLevel,
            education,
            projects
        });
        console.log('[DEBUG] Career recommendations generated:', careerRecommendations.length);
        
        console.log('[DEBUG] Calling findMatchingJobs...');
        const matchingJobs = findMatchingJobs(detectedSkills, experienceLevel);
        console.log('[DEBUG] Matching jobs found:', matchingJobs);

        const analysis = {
            detectedSkills,
            skills: detectedSkills,
            softSkills,
            education,
            projects,
            certifications,
            experience,
            experienceLevel,
            resumeScore,
            atsScore,
            overallScore: resumeScore,
            strengths,
            weaknesses,
            missingSkills,
            careerRecommendations,
            strengthAreas: strengths,
            improvementAreas: weaknesses,
            matchingJobs,
            extractedTextPreview: extractedText.slice(0, 500),
            // Auto-fill data for interests form
            autoFill: {
                careerInterests: extractedInterests,
                preferredLocation: extractedLocation,
                workEnvironment: extractedWorkEnvironment,
                learningGoals: extractedLearningGoals,
                experienceLevel: experienceLevel
            }
        };

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
    } finally {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
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

        const recommendations = generateCareerRecommendations(currentSkills, {
            careerGoal,
            experienceLevel
        });

        res.json({
            success: true,
            message: 'Career recommendations generated',
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

const skillOntology = [
    // Frontend Development
    { name: 'JavaScript', aliases: ['javascript', 'js', 'ecmascript', 'es6', 'es2015'], category: 'Frontend' },
    { name: 'TypeScript', aliases: ['typescript', 'ts'], category: 'Frontend' },
    { name: 'React', aliases: ['react', 'react.js', 'reactjs', 'reactjs'], category: 'Frontend' },
    { name: 'Redux', aliases: ['redux', 'redux toolkit', 'rtk'], category: 'Frontend' },
    { name: 'Next.js', aliases: ['next.js', 'nextjs', 'next js'], category: 'Frontend' },
    { name: 'Vue.js', aliases: ['vue', 'vue.js', 'vuejs'], category: 'Frontend' },
    { name: 'Angular', aliases: ['angular', 'angularjs', 'angular js'], category: 'Frontend' },
    { name: 'HTML', aliases: ['html', 'html5', 'hypertext markup language'], category: 'Frontend' },
    { name: 'CSS', aliases: ['css', 'css3', 'cascading style sheets'], category: 'Frontend' },
    { name: 'Tailwind CSS', aliases: ['tailwind', 'tailwind css', 'tailwindcss'], category: 'Frontend' },
    { name: 'SASS', aliases: ['sass', 'scss'], category: 'Frontend' },
    { name: 'Bootstrap', aliases: ['bootstrap', 'twitter bootstrap'], category: 'Frontend' },
    { name: 'Webpack', aliases: ['webpack', 'module bundler'], category: 'Frontend' },
    { name: 'Vite', aliases: ['vite'], category: 'Frontend' },
    { name: 'Jest', aliases: ['jest', 'testing'], category: 'Frontend' },
    { name: 'Cypress', aliases: ['cypress', 'e2e testing'], category: 'Frontend' },
    { name: 'Storybook', aliases: ['storybook', 'component development'], category: 'Frontend' },
    { name: 'Svelte', aliases: ['svelte', 'sveltejs'], category: 'Frontend' },
    { name: 'SolidJS', aliases: ['solid', 'solidjs'], category: 'Frontend' },
    { name: 'Qwik', aliases: ['qwik', 'qwik framework'], category: 'Frontend' },
    { name: 'Astro', aliases: ['astro', 'astro framework'], category: 'Frontend' },
    { name: 'Remix', aliases: ['remix', 'remix run'], category: 'Frontend' },
    { name: 'Gatsby', aliases: ['gatsby', 'gatsbyjs'], category: 'Frontend' },
    { name: 'Nuxt.js', aliases: ['nuxt', 'nuxtjs', 'nuxt 3'], category: 'Frontend' },
    { name: 'MobX', aliases: ['mobx', 'mobx state'], category: 'Frontend' },
    { name: 'Zustand', aliases: ['zustand', 'react state'], category: 'Frontend' },
    { name: 'Recoil', aliases: ['recoil', 'facebook recoil'], category: 'Frontend' },
    { name: 'Jotai', aliases: ['jotai', 'atomic state'], category: 'Frontend' },
    { name: 'XState', aliases: ['xstate', 'state machine'], category: 'Frontend' },
    { name: 'Redux Toolkit', aliases: ['redux toolkit', 'rtk'], category: 'Frontend' },
    { name: 'React Query', aliases: ['react query', 'tanstack query'], category: 'Frontend' },
    { name: 'SWR', aliases: ['swr', 'stale while revalidate'], category: 'Frontend' },
    { name: 'Axios', aliases: ['axios', 'http client'], category: 'Frontend' },
    { name: 'Fetch API', aliases: ['fetch', 'fetch api'], category: 'Frontend' },
    { name: 'XMLHttpRequest', aliases: ['xhr', 'xmlhttprequest'], category: 'Frontend' },
    { name: 'Socket.io', aliases: ['socket.io', 'socketio'], category: 'Frontend' },
    { name: 'Socket.io Client', aliases: ['socket.io client', 'socket client'], category: 'Frontend' },
    { name: 'Pusher', aliases: ['pusher', 'realtime api'], category: 'Frontend' },
    { name: 'Firebase Realtime Database', aliases: ['firebase realtime', 'realtime database'], category: 'Frontend' },
    { name: 'Firebase Firestore', aliases: ['firestore', 'firebase firestore'], category: 'Frontend' },
    { name: 'Supabase', aliases: ['supabase', 'firebase alternative'], category: 'Frontend' },
    { name: 'Apollo Client', aliases: ['apollo client', 'apollo graphql'], category: 'Frontend' },
    { name: 'Relay', aliases: ['relay', 'facebook relay'], category: 'Frontend' },
    { name: 'Urql', aliases: ['urql', 'graphql client'], category: 'Frontend' },
    { name: 'Formik', aliases: ['formik', 'form library'], category: 'Frontend' },
    { name: 'React Hook Form', aliases: ['react hook form', 'rhf'], category: 'Frontend' },
    { name: 'Yup', aliases: ['yup', 'schema validation'], category: 'Frontend' },
    { name: 'Zod', aliases: ['zod', 'schema validation'], category: 'Frontend' },
    { name: 'Joi', aliases: ['joi', 'schema validation'], category: 'Frontend' },
    { name: 'React Router', aliases: ['react router', 'routing'], category: 'Frontend' },
    { name: 'Vue Router', aliases: ['vue router', 'vue routing'], category: 'Frontend' },
    { name: 'Angular Router', aliases: ['angular router', 'angular routing'], category: 'Frontend' },
    { name: 'Reach Router', aliases: ['reach router', 'routing'], category: 'Frontend' },
    { name: 'History API', aliases: ['history api', 'browser history'], category: 'Frontend' },
    { name: 'URLSearchParams', aliases: ['url search params', 'query params'], category: 'Frontend' },
    { name: 'Material-UI', aliases: ['material ui', 'mui', 'material design'], category: 'Frontend' },
    { name: 'Chakra UI', aliases: ['chakra ui', 'chakra'], category: 'Frontend' },
    { name: 'Ant Design', aliases: ['ant design', 'antd'], category: 'Frontend' },
    { name: 'Mantine', aliases: ['mantine', 'react component library'], category: 'Frontend' },
    { name: 'Radix UI', aliases: ['radix ui', 'radix'], category: 'Frontend' },
    { name: 'Headless UI', aliases: ['headless ui', 'tailwind ui'], category: 'Frontend' },
    { name: 'Shadcn/ui', aliases: ['shadcn', 'shadcn ui'], category: 'Frontend' },
    { name: 'DaisyUI', aliases: ['daisyui', 'tailwind components'], category: 'Frontend' },
    { name: 'Bulma', aliases: ['bulma', 'css framework'], category: 'Frontend' },
    { name: 'Foundation', aliases: ['foundation', 'css framework'], category: 'Frontend' },
    { name: 'Pure CSS', aliases: ['pure css', 'pure'], category: 'Frontend' },
    { name: 'Skeleton', aliases: ['skeleton', 'css framework'], category: 'Frontend' },
    { name: 'Milligram', aliases: ['milligram', 'css framework'], category: 'Frontend' },
    { name: 'Picocss', aliases: ['picocss', 'pico css'], category: 'Frontend' },
    { name: 'Tachyons', aliases: ['tachyons', 'functional css'], category: 'Frontend' },
    { name: 'Windicss', aliases: ['windicss', 'tailwind alternative'], category: 'Frontend' },
    { name: 'UnoCSS', aliases: ['unocss', 'atomic css'], category: 'Frontend' },
    { name: 'PostCSS', aliases: ['postcss', 'css processor'], category: 'Frontend' },
    { name: 'Autoprefixer', aliases: ['autoprefixer', 'postcss plugin'], category: 'Frontend' },
    { name: 'CSS Modules', aliases: ['css modules', 'module css'], category: 'Frontend' },
    { name: 'Styled Components', aliases: ['styled components', 'css in js'], category: 'Frontend' },
    { name: 'Emotion', aliases: ['emotion', 'css in js'], category: 'Frontend' },
    { name: 'Glamor', aliases: ['glamor', 'css in js'], category: 'Frontend' },
    { name: 'Goober', aliases: ['goober', 'css in js'], category: 'Frontend' },
    { name: 'Linaria', aliases: ['linaria', 'zero runtime css'], category: 'Frontend' },
    { name: 'Vanilla Extract', aliases: ['vanilla extract', 'css in js'], category: 'Frontend' },
    { name: 'PurgeCSS', aliases: ['purgecss', 'css optimizer'], category: 'Frontend' },
    { name: 'UnCSS', aliases: ['uncss', 'css optimizer'], category: 'Frontend' },
    { name: 'CSSNano', aliases: ['cssnano', 'css minifier'], category: 'Frontend' },
    { name: 'Rollup', aliases: ['rollup', 'module bundler'], category: 'Frontend' },
    { name: 'Parcel', aliases: ['parcel', 'bundler'], category: 'Frontend' },
    { name: 'esbuild', aliases: ['esbuild', 'bundler'], category: 'Frontend' },
    { name: 'Browserify', aliases: ['browserify', 'bundler'], category: 'Frontend' },
    { name: 'Snowpack', aliases: ['snowpack', 'bundler'], category: 'Frontend' },
    { name: 'Rome', aliases: ['rome', 'linter bundler'], category: 'Frontend' },
    { name: 'SWC', aliases: ['swc', 'transpiler'], category: 'Frontend' },
    { name: 'Babel', aliases: ['babel', 'transpiler'], category: 'Frontend' },
    { name: 'TypeScript', aliases: ['typescript', 'ts'], category: 'Frontend' },
    { name: 'Flow', aliases: ['flow', 'type checker'], category: 'Frontend' },
    { name: 'ESLint', aliases: ['eslint', 'linter'], category: 'Frontend' },
    { name: 'Prettier', aliases: ['prettier', 'formatter'], category: 'Frontend' },
    { name: 'Stylelint', aliases: ['stylelint', 'css linter'], category: 'Frontend' },
    { name: 'Husky', aliases: ['husky', 'git hooks'], category: 'Frontend' },
    { name: 'lint-staged', aliases: ['lint staged', 'git hooks'], category: 'Frontend' },
    { name: 'Commitlint', aliases: ['commitlint', 'commit linter'], category: 'Frontend' },
    { name: 'Jest', aliases: ['jest', 'testing framework'], category: 'Frontend' },
    { name: 'Vitest', aliases: ['vitest', 'testing framework'], category: 'Frontend' },
    { name: 'Mocha', aliases: ['mocha', 'testing framework'], category: 'Frontend' },
    { name: 'Chai', aliases: ['chai', 'assertion library'], category: 'Frontend' },
    { name: 'Sinon', aliases: ['sinon', 'test doubles'], category: 'Frontend' },
    { name: 'Testing Library', aliases: ['testing library', 'dom testing'], category: 'Frontend' },
    { name: 'React Testing Library', aliases: ['react testing library', 'rtl'], category: 'Frontend' },
    { name: 'Vue Testing Library', aliases: ['vue testing library'], category: 'Frontend' },
    { name: 'Angular Testing Library', aliases: ['angular testing library'], category: 'Frontend' },
    { name: 'Cypress', aliases: ['cypress', 'e2e testing'], category: 'Frontend' },
    { name: 'Playwright', aliases: ['playwright', 'e2e testing'], category: 'Frontend' },
    { name: 'Puppeteer', aliases: ['puppeteer', 'headless chrome'], category: 'Frontend' },
    { name: 'Selenium', aliases: ['selenium', 'browser automation'], category: 'Frontend' },
    { name: 'WebDriver', aliases: ['webdriver', 'selenium'], category: 'Frontend' },
    { name: 'Nightwatch', aliases: ['nightwatch', 'e2e testing'], category: 'Frontend' },
    { name: 'TestCafe', aliases: ['testcafe', 'e2e testing'], category: 'Frontend' },
    { name: 'Percy', aliases: ['percy', 'visual testing'], category: 'Frontend' },
    { name: 'Storybook', aliases: ['storybook', 'component testing'], category: 'Frontend' },
    { name: 'Chromatic', aliases: ['chromatic', 'storybook testing'], category: 'Frontend' },
    { name: 'Lighthouse', aliases: ['lighthouse', 'performance testing'], category: 'Frontend' },
    { name: 'WebPageTest', aliases: ['webpagetest', 'performance testing'], category: 'Frontend' },
    { name: 'GTmetrix', aliases: ['gtmetrix', 'performance testing'], category: 'Frontend' },
    { name: 'PageSpeed Insights', aliases: ['pagespeed insights', 'performance testing'], category: 'Frontend' },
    { name: 'Core Web Vitals', aliases: ['core web vitals', 'cwv'], category: 'Frontend' },
    { name: 'Web Vitals', aliases: ['web vitals', 'performance metrics'], category: 'Frontend' },
    { name: 'Performance API', aliases: ['performance api', 'performance'], category: 'Frontend' },
    { name: 'Intersection Observer', aliases: ['intersection observer', 'lazy loading'], category: 'Frontend' },
    { name: 'Resize Observer', aliases: ['resize observer', 'responsive'], category: 'Frontend' },
    { name: 'Mutation Observer', aliases: ['mutation observer', 'dom changes'], category: 'Frontend' },
    { name: 'Request Animation Frame', aliases: ['requestanimationframe', 'animation'], category: 'Frontend' },
    { name: 'Web Workers', aliases: ['web workers', 'workers'], category: 'Frontend' },
    { name: 'Service Workers', aliases: ['service workers', 'sw'], category: 'Frontend' },
    { name: 'Workbox', aliases: ['workbox', 'service workers'], category: 'Frontend' },
    { name: 'PWA', aliases: ['pwa', 'progressive web app'], category: 'Frontend' },
    { name: 'Web App Manifest', aliases: ['web app manifest', 'manifest'], category: 'Frontend' },
    { name: 'Push Notifications', aliases: ['push notifications', 'web push'], category: 'Frontend' },
    { name: 'Background Sync', aliases: ['background sync', 'service workers'], category: 'Frontend' },
    { name: 'IndexedDB', aliases: ['indexeddb', 'browser database'], category: 'Frontend' },
    { name: 'WebSQL', aliases: ['websql', 'browser database'], category: 'Frontend' },
    { name: 'LocalStorage', aliases: ['localstorage', 'browser storage'], category: 'Frontend' },
    { name: 'SessionStorage', aliases: ['sessionstorage', 'browser storage'], category: 'Frontend' },
    { name: 'Cookies', aliases: ['cookies', 'browser cookies'], category: 'Frontend' },
    { name: 'Cache API', aliases: ['cache api', 'browser cache'], category: 'Frontend' },
    { name: 'Storage API', aliases: ['storage api', 'browser storage'], category: 'Frontend' },
    { name: 'File API', aliases: ['file api', 'file handling'], category: 'Frontend' },
    { name: 'Blob API', aliases: ['blob api', 'binary data'], category: 'Frontend' },
    { name: 'FileReader API', aliases: ['filereader', 'file reading'], category: 'Frontend' },
    { name: 'Canvas API', aliases: ['canvas api', '2d graphics'], category: 'Frontend' },
    { name: 'WebGL', aliases: ['webgl', '3d graphics'], category: 'Frontend' },
    { name: 'WebGL2', aliases: ['webgl2', '3d graphics'], category: 'Frontend' },
    { name: 'WebGPU', aliases: ['webgpu', 'gpu computing'], category: 'Frontend' },
    { name: 'Three.js', aliases: ['three.js', '3d library'], category: 'Frontend' },
    { name: 'Babylon.js', aliases: ['babylon.js', '3d engine'], category: 'Frontend' },
    { name: 'D3.js', aliases: ['d3.js', 'data visualization'], category: 'Frontend' },
    { name: 'Chart.js', aliases: ['chart.js', 'charting library'], category: 'Frontend' },
    { name: 'Chartkick', aliases: ['chartkick', 'charting'], category: 'Frontend' },
    { name: 'Highcharts', aliases: ['highcharts', 'charting'], category: 'Frontend' },
    { name: 'ECharts', aliases: ['echarts', 'charting'], category: 'Frontend' },
    { name: 'Plotly', aliases: ['plotly', 'charting'], category: 'Frontend' },
    { name: 'Leaflet', aliases: ['leaflet', 'maps'], category: 'Frontend' },
    { name: 'Mapbox', aliases: ['mapbox', 'maps'], category: 'Frontend' },
    { name: 'Google Maps API', aliases: ['google maps', 'maps api'], category: 'Frontend' },
    { name: 'OpenStreetMap', aliases: ['openstreetmap', 'osm'], category: 'Frontend' },
    { name: 'MediaRecorder API', aliases: ['mediarecorder', 'media recording'], category: 'Frontend' },
    { name: 'WebRTC', aliases: ['webrtc', 'realtime communication'], category: 'Frontend' },
    { name: 'Web Audio API', aliases: ['web audio api', 'audio'], category: 'Frontend' },
    { name: 'Web Speech API', aliases: ['web speech api', 'speech recognition'], category: 'Frontend' },
    { name: 'Speech Recognition', aliases: ['speech recognition', 'speech api'], category: 'Frontend' },
    { name: 'Speech Synthesis', aliases: ['speech synthesis', 'tts'], category: 'Frontend' },
    { name: 'Geolocation API', aliases: ['geolocation', 'location'], category: 'Frontend' },
    { name: 'Device Orientation', aliases: ['device orientation', 'mobile sensors'], category: 'Frontend' },
    { name: 'Device Motion', aliases: ['device motion', 'mobile sensors'], category: 'Frontend' },
    { name: 'Touch Events', aliases: ['touch events', 'touch'], category: 'Frontend' },
    { name: 'Pointer Events', aliases: ['pointer events', 'input'], category: 'Frontend' },
    { name: 'Drag and Drop API', aliases: ['drag and drop', 'dnd'], category: 'Frontend' },
    { name: 'Clipboard API', aliases: ['clipboard api', 'copy paste'], category: 'Frontend' },
    { name: 'Selection API', aliases: ['selection api', 'text selection'], category: 'Frontend' },
    { name: 'Fullscreen API', aliases: ['fullscreen api', 'fullscreen'], category: 'Frontend' },
    { name: 'Screen Orientation API', aliases: ['screen orientation', 'orientation'], category: 'Frontend' },
    { name: 'Wake Lock API', aliases: ['wake lock', 'screen wake'], category: 'Frontend' },
    { name: 'Idle Detection API', aliases: ['idle detection', 'user activity'], category: 'Frontend' },
    { name: 'Network Information API', aliases: ['network information', 'network status'], category: 'Frontend' },
    { name: 'Connection API', aliases: ['connection api', 'network'], category: 'Frontend' },
    { name: 'Battery Status API', aliases: ['battery status', 'battery'], category: 'Frontend' },
    { name: 'Vibration API', aliases: ['vibration api', 'haptic feedback'], category: 'Frontend' },
    { name: 'Permissions API', aliases: ['permissions api', 'user permissions'], category: 'Frontend' },
    { name: 'Credential Management API', aliases: ['credential management', 'passwords'], category: 'Frontend' },
    { name: 'Web Authentication API', aliases: ['webauthn', 'web authentication'], category: 'Frontend' },
    { name: 'Payment Request API', aliases: ['payment request api', 'payments'], category: 'Frontend' },
    { name: 'Payment Handler API', aliases: ['payment handler api', 'payments'], category: 'Frontend' },
    { name: 'Content Indexing API', aliases: ['content indexing', 'offline content'], category: 'Frontend' },
    { name: 'Content Security Policy', aliases: ['csp', 'content security policy'], category: 'Frontend' },
    { name: 'Subresource Integrity', aliases: ['sri', 'subresource integrity'], category: 'Frontend' },
    { name: 'Mixed Content', aliases: ['mixed content', 'https'], category: 'Frontend' },
    { name: 'CORS', aliases: ['cors', 'cross origin'], category: 'Frontend' },
    { name: 'CSP', aliases: ['csp', 'content security policy'], category: 'Frontend' },
    { name: 'X-Frame-Options', aliases: ['x frame options', 'clickjacking'], category: 'Frontend' },
    { name: 'X-Content-Type-Options', aliases: ['x content type options', 'mime sniffing'], category: 'Frontend' },
    { name: 'X-XSS-Protection', aliases: ['x xss protection', 'xss'], category: 'Frontend' },
    { name: 'Referrer Policy', aliases: ['referrer policy', 'referrer'], category: 'Frontend' },
    { name: 'Feature Policy', aliases: ['feature policy', 'permissions'], category: 'Frontend' },
    { name: 'Permissions Policy', aliases: ['permissions policy', 'feature policy'], category: 'Frontend' },
    { name: 'HTTPS', aliases: ['https', 'ssl', 'tls'], category: 'Frontend' },
    { name: 'SSL/TLS', aliases: ['ssl', 'tls', 'encryption'], category: 'Frontend' },
    { name: 'HSTS', aliases: ['hsts', 'http strict transport security'], category: 'Frontend' },
    { name: 'HPKP', aliases: ['hpkp', 'http public key pins'], category: 'Frontend' },
    { name: 'Certificate Transparency', aliases: ['certificate transparency', 'ct'], category: 'Frontend' },
    { name: 'OCSP Stapling', aliases: ['ocsp stapling', 'ssl'], category: 'Frontend' },
    { name: 'SEO', aliases: ['seo', 'search engine optimization'], category: 'Frontend' },
    { name: 'Meta Tags', aliases: ['meta tags', 'html meta'], category: 'Frontend' },
    { name: 'Open Graph', aliases: ['open graph', 'og tags'], category: 'Frontend' },
    { name: 'Twitter Cards', aliases: ['twitter cards', 'twitter meta'], category: 'Frontend' },
    { name: 'Schema.org', aliases: ['schema.org', 'structured data'], category: 'Frontend' },
    { name: 'JSON-LD', aliases: ['json ld', 'linked data'], category: 'Frontend' },
    { name: 'Microdata', aliases: ['microdata', 'structured data'], category: 'Frontend' },
    { name: 'RDFa', aliases: ['rdfa', 'structured data'], category: 'Frontend' },
    { name: 'Sitemaps', aliases: ['sitemap', 'sitemaps xml'], category: 'Frontend' },
    { name: 'Robots.txt', aliases: ['robots.txt', 'crawlers'], category: 'Frontend' },
    { name: 'Canonical URLs', aliases: ['canonical url', 'duplicate content'], category: 'Frontend' },
    { name: '301 Redirects', aliases: ['301 redirect', 'permanent redirect'], category: 'Frontend' },
    { name: '302 Redirects', aliases: ['302 redirect', 'temporary redirect'], category: 'Frontend' },
    { name: '404 Pages', aliases: ['404 page', 'not found'], category: 'Frontend' },
    { name: 'Accessibility', aliases: ['accessibility', 'a11y'], category: 'Frontend' },
    { name: 'WCAG', aliases: ['wcag', 'web content accessibility guidelines'], category: 'Frontend' },
    { name: 'ARIA', aliases: ['aria', 'accessible rich internet applications'], category: 'Frontend' },
    { name: 'ARIA Attributes', aliases: ['aria attributes', 'aria'], category: 'Frontend' },
    { name: 'ARIA Roles', aliases: ['aria roles', 'aria'], category: 'Frontend' },
    { name: 'Screen Readers', aliases: ['screen readers', 'assistive technology'], category: 'Frontend' },
    { name: 'Keyboard Navigation', aliases: ['keyboard navigation', 'accessibility'], category: 'Frontend' },
    { name: 'Focus Management', aliases: ['focus management', 'accessibility'], category: 'Frontend' },
    { name: 'Skip Links', aliases: ['skip links', 'accessibility'], category: 'Frontend' },
    { name: 'Alt Text', aliases: ['alt text', 'image accessibility'], category: 'Frontend' },
    { name: 'Color Contrast', aliases: ['color contrast', 'accessibility'], category: 'Frontend' },
    { name: 'Font Scaling', aliases: ['font scaling', 'accessibility'], category: 'Frontend' },
    { name: 'Responsive Design', aliases: ['responsive design', 'mobile first'], category: 'Frontend' },
    { name: 'Mobile First', aliases: ['mobile first', 'responsive design'], category: 'Frontend' },
    { name: 'Adaptive Design', aliases: ['adaptive design', 'responsive'], category: 'Frontend' },
    { name: 'Fluid Design', aliases: ['fluid design', 'responsive'], category: 'Frontend' },
    { name: 'Media Queries', aliases: ['media queries', 'responsive'], category: 'Frontend' },
    { name: 'Breakpoints', aliases: ['breakpoints', 'responsive'], category: 'Frontend' },
    { name: 'Grid Layout', aliases: ['grid layout', 'css grid'], category: 'Frontend' },
    { name: 'Flexbox', aliases: ['flexbox', 'flex'], category: 'Frontend' },
    { name: 'CSS Grid', aliases: ['css grid', 'grid'], category: 'Frontend' },
    { name: 'CSS Flexbox', aliases: ['css flexbox', 'flexbox'], category: 'Frontend' },
    { name: 'Box Model', aliases: ['box model', 'css'], category: 'Frontend' },
    { name: 'Positioning', aliases: ['positioning', 'css'], category: 'Frontend' },
    { name: 'Float', aliases: ['float', 'css'], category: 'Frontend' },
    { name: 'Clear', aliases: ['clear', 'css'], category: 'Frontend' },
    { name: 'Display', aliases: ['display', 'css'], category: 'Frontend' },
    { name: 'Visibility', aliases: ['visibility', 'css'], category: 'Frontend' },
    { name: 'Opacity', aliases: ['opacity', 'css'], category: 'Frontend' },
    { name: 'Transform', aliases: ['transform', 'css'], category: 'Frontend' },
    { name: 'Transition', aliases: ['transition', 'css'], category: 'Frontend' },
    { name: 'Animation', aliases: ['animation', 'css'], category: 'Frontend' },
    { name: 'Keyframes', aliases: ['keyframes', 'css animation'], category: 'Frontend' },
    { name: 'Gradient', aliases: ['gradient', 'css'], category: 'Frontend' },
    { name: 'Shadow', aliases: ['shadow', 'css'], category: 'Frontend' },
    { name: 'Border Radius', aliases: ['border radius', 'css'], category: 'Frontend' },
    { name: 'Box Shadow', aliases: ['box shadow', 'css'], category: 'Frontend' },
    { name: 'Text Shadow', aliases: ['text shadow', 'css'], category: 'Frontend' },
    { name: 'Filter', aliases: ['filter', 'css'], category: 'Frontend' },
    { name: 'Backdrop Filter', aliases: ['backdrop filter', 'css'], category: 'Frontend' },
    { name: 'Blend Modes', aliases: ['blend modes', 'css'], category: 'Frontend' },
    { name: 'Clipping', aliases: ['clipping', 'css'], category: 'Frontend' },
    { name: 'Masking', aliases: ['masking', 'css'], category: 'Frontend' },
    { name: 'Shapes', aliases: ['shapes', 'css'], category: 'Frontend' },
    { name: 'Custom Properties', aliases: ['custom properties', 'css variables'], category: 'Frontend' },
    { name: 'CSS Variables', aliases: ['css variables', 'custom properties'], category: 'Frontend' },
    { name: 'Calc', aliases: ['calc', 'css function'], category: 'Frontend' },
    { name: 'Min', aliases: ['min', 'css function'], category: 'Frontend' },
    { name: 'Max', aliases: ['max', 'css function'], category: 'Frontend' },
    { name: 'Clamp', aliases: ['clamp', 'css function'], category: 'Frontend' },
    { name: 'CSS Functions', aliases: ['css functions', 'css'], category: 'Frontend' },
    { name: 'Selectors', aliases: ['selectors', 'css'], category: 'Frontend' },
    { name: 'Pseudo-classes', aliases: ['pseudo classes', 'css'], category: 'Frontend' },
    { name: 'Pseudo-elements', aliases: ['pseudo elements', 'css'], category: 'Frontend' },
    { name: 'Combinators', aliases: ['combinators', 'css selectors'], category: 'Frontend' },
    { name: 'Specificity', aliases: ['specificity', 'css'], category: 'Frontend' },
    { name: 'Cascade', aliases: ['cascade', 'css'], category: 'Frontend' },
    { name: 'Inheritance', aliases: ['inheritance', 'css'], category: 'Frontend' },
    { name: 'CSS Architecture', aliases: ['css architecture', 'css organization'], category: 'Frontend' },
    { name: 'BEM', aliases: ['bem', 'block element modifier'], category: 'Frontend' },
    { name: 'OOCSS', aliases: ['oocss', 'object oriented css'], category: 'Frontend' },
    { name: 'SMACSS', aliases: ['smacss', 'scalable modular css'], category: 'Frontend' },
    { name: 'ITCSS', aliases: ['itcss', 'inverted triangle css'], category: 'Frontend' },
    { name: 'Atomic CSS', aliases: ['atomic css', 'utility first'], category: 'Frontend' },
    { name: 'Utility-First CSS', aliases: ['utility first css', 'atomic css'], category: 'Frontend' },
    { name: 'Component-Driven CSS', aliases: ['component driven css', 'css'], category: 'Frontend' },
    
    // Backend Development
    { name: 'Node.js', aliases: ['node.js', 'nodejs', 'node js'], category: 'Backend' },
    { name: 'Express.js', aliases: ['express', 'express.js', 'expressjs'], category: 'Backend' },
    { name: 'NestJS', aliases: ['nestjs', 'nest js'], category: 'Backend' },
    { name: 'Django', aliases: ['django', 'django framework'], category: 'Backend' },
    { name: 'Flask', aliases: ['flask', 'flask framework'], category: 'Backend' },
    { name: 'FastAPI', aliases: ['fastapi', 'fast api'], category: 'Backend' },
    { name: 'Spring Boot', aliases: ['spring boot', 'springboot'], category: 'Backend' },
    { name: 'Ruby on Rails', aliases: ['ruby on rails', 'rails', 'ror'], category: 'Backend' },
    { name: 'PHP', aliases: ['php', 'php7', 'php8'], category: 'Backend' },
    { name: 'Laravel', aliases: ['laravel', 'laravel framework'], category: 'Backend' },
    { name: 'Symfony', aliases: ['symfony', 'symfony framework'], category: 'Backend' },
    { name: 'CodeIgniter', aliases: ['codeigniter', 'ci'], category: 'Backend' },
    { name: 'CakePHP', aliases: ['cakephp', 'cake php'], category: 'Backend' },
    { name: 'Yii', aliases: ['yii', 'yii framework', 'yii2'], category: 'Backend' },
    { name: 'Slim', aliases: ['slim', 'slim framework', 'php microframework'], category: 'Backend' },
    { name: 'Lumen', aliases: ['lumen', 'laravel lumen', 'php microframework'], category: 'Backend' },
    { name: 'Go', aliases: ['go', 'golang', 'go lang'], category: 'Backend' },
    { name: 'Gin', aliases: ['gin', 'gin framework', 'go web'], category: 'Backend' },
    { name: 'Echo', aliases: ['echo', 'echo framework', 'go web'], category: 'Backend' },
    { name: 'Fiber', aliases: ['fiber', 'fiber framework', 'go web'], category: 'Backend' },
    { name: 'Buffalo', aliases: ['buffalo', 'buffalo framework', 'go web'], category: 'Backend' },
    { name: 'Rust', aliases: ['rust', 'rust lang'], category: 'Backend' },
    { name: 'Actix', aliases: ['actix', 'actix web', 'rust web'], category: 'Backend' },
    { name: 'Rocket', aliases: ['rocket', 'rocket framework', 'rust web'], category: 'Backend' },
    { name: 'Axum', aliases: ['axum', 'axum framework', 'rust web'], category: 'Backend' },
    { name: 'Warp', aliases: ['warp', 'warp framework', 'rust web'], category: 'Backend' },
    { name: 'Java', aliases: ['java', 'core java', 'java se'], category: 'Backend' },
    { name: 'Spring', aliases: ['spring', 'spring framework'], category: 'Backend' },
    { name: 'Spring MVC', aliases: ['spring mvc', 'spring web mvc'], category: 'Backend' },
    { name: 'Spring Security', aliases: ['spring security', 'spring auth'], category: 'Backend' },
    { name: 'Spring Data', aliases: ['spring data', 'spring jpa'], category: 'Backend' },
    { name: 'Spring Boot', aliases: ['spring boot', 'springboot'], category: 'Backend' },
    { name: 'Spring Cloud', aliases: ['spring cloud', 'microservices'], category: 'Backend' },
    { name: 'Micronaut', aliases: ['micronaut', 'micronaut framework'], category: 'Backend' },
    { name: 'Quarkus', aliases: ['quarkus', 'quarkus framework'], category: 'Backend' },
    { name: 'Vert.x', aliases: ['vert.x', 'vertx', 'reactive'], category: 'Backend' },
    { name: 'Dropwizard', aliases: ['dropwizard', 'java framework'], category: 'Backend' },
    { name: 'Javalin', aliases: ['javalin', 'java framework'], category: 'Backend' },
    { name: 'Spark Java', aliases: ['spark java', 'java framework'], category: 'Backend' },
    { name: 'Ktor', aliases: ['ktor', 'ktor framework', 'kotlin web'], category: 'Backend' },
    { name: 'C#', aliases: ['c#', 'c sharp', 'csharp'], category: 'Backend' },
    { name: '.NET', aliases: ['.net', 'dotnet', '.net framework'], category: 'Backend' },
    { name: 'ASP.NET', aliases: ['asp.net', 'aspnet', 'asp net'], category: 'Backend' },
    { name: 'ASP.NET Core', aliases: ['asp.net core', 'aspnet core', 'dotnet core'], category: 'Backend' },
    { name: 'ASP.NET MVC', aliases: ['asp.net mvc', 'aspnet mvc'], category: 'Backend' },
    { name: 'ASP.NET Web API', aliases: ['asp.net web api', 'web api'], category: 'Backend' },
    { name: 'Entity Framework', aliases: ['entity framework', 'ef', 'ef core'], category: 'Backend' },
    { name: 'Dapper', aliases: ['dapper', 'dapper dotnet'], category: 'Backend' },
    { name: 'NHibernate', aliases: ['nhibernate', 'hibernate dotnet'], category: 'Backend' },
    { name: 'PetaPoco', aliases: ['petapoco', 'micro orm'], category: 'Backend' },
    { name: 'C++', aliases: ['c++', 'cpp'], category: 'Backend' },
    { name: 'Boost', aliases: ['boost', 'boost library'], category: 'Backend' },
    { name: 'Qt', aliases: ['qt', 'qt framework'], category: 'Backend' },
    { name: 'POCO', aliases: ['poco', 'poco c++'], category: 'Backend' },
    { name: 'Drogon', aliases: ['drogon', 'c++ web framework'], category: 'Backend' },
    { name: 'Oat++', aliases: ['oat++', 'oatpp', 'c++ web framework'], category: 'Backend' },
    { name: 'Crow', aliases: ['crow', 'c++ web framework'], category: 'Backend' },
    { name: 'REST APIs', aliases: ['rest api', 'rest apis', 'restful api', 'api integration', 'api development'], category: 'Backend' },
    { name: 'RESTful', aliases: ['restful', 'rest', 'api design'], category: 'Backend' },
    { name: 'OpenAPI', aliases: ['openapi', 'swagger', 'openapi specification'], category: 'Backend' },
    { name: 'Swagger', aliases: ['swagger', 'openapi', 'api documentation'], category: 'Backend' },
    { name: 'API Gateway', aliases: ['api gateway', 'gateway', 'api management'], category: 'Backend' },
    { name: 'GraphQL', aliases: ['graphql', 'gql', 'graph query language'], category: 'Backend' },
    { name: 'Apollo GraphQL', aliases: ['apollo graphql', 'apollo server'], category: 'Backend' },
    { name: 'GraphQL Yoga', aliases: ['graphql yoga', 'graphql server'], category: 'Backend' },
    { name: 'Hasura', aliases: ['hasura', 'graphql engine'], category: 'Backend' },
    { name: 'Postgraphile', aliases: ['postgraphile', 'graphql api'], category: 'Backend' },
    { name: 'gRPC', aliases: ['grpc', 'grpc protocol', 'google rpc'], category: 'Backend' },
    { name: 'Protocol Buffers', aliases: ['protobuf', 'protocol buffers', 'serialization'], category: 'Backend' },
    { name: 'Thrift', aliases: ['thrift', 'apache thrift', 'rpc'], category: 'Backend' },
    { name: 'Avro', aliases: ['avro', 'apache avro', 'serialization'], category: 'Backend' },
    { name: 'MessagePack', aliases: ['msgpack', 'message pack', 'serialization'], category: 'Backend' },
    { name: 'FlatBuffers', aliases: ['flatbuffers', 'serialization', 'google'], category: 'Backend' },
    { name: 'Cap\'n Proto', aliases: ['capn proto', 'cap\'n proto', 'serialization'], category: 'Backend' },
    { name: 'WebSockets', aliases: ['websockets', 'socket.io', 'realtime', 'ws'], category: 'Backend' },
    { name: 'Socket.io', aliases: ['socket.io', 'socketio', 'websocket'], category: 'Backend' },
    { name: 'Socket.io Server', aliases: ['socket.io server', 'socket server'], category: 'Backend' },
    { name: 'WS', aliases: ['ws', 'websocket library'], category: 'Backend' },
    { name: 'SocketCluster', aliases: ['socketcluster', 'websocket framework'], category: 'Backend' },
    { name: 'DeepStream', aliases: ['deepstream', 'realtime framework'], category: 'Backend' },
    { name: 'Pusher', aliases: ['pusher', 'realtime api'], category: 'Backend' },
    { name: 'Ably', aliases: ['ably', 'realtime messaging'], category: 'Backend' },
    { name: 'Fanout', aliases: ['fanout', 'realtime'], category: 'Backend' },
    { name: 'Microservices', aliases: ['microservices', 'microservices architecture', 'distributed systems'], category: 'Backend' },
    { name: 'Service Mesh', aliases: ['service mesh', 'istio', 'linkerd'], category: 'Backend' },
    { name: 'Service Discovery', aliases: ['service discovery', 'consul', 'eureka'], category: 'Backend' },
    { name: 'API Gateway', aliases: ['api gateway', 'kong', 'ambassador'], category: 'Backend' },
    { name: 'Circuit Breaker', aliases: ['circuit breaker', 'hystrix', 'resilience'], category: 'Backend' },
    { name: 'Rate Limiting', aliases: ['rate limiting', 'throttling', 'api limits'], category: 'Backend' },
    { name: 'Load Balancing', aliases: ['load balancing', 'nginx', 'haproxy'], category: 'Backend' },
    { name: 'Caching', aliases: ['caching', 'redis', 'memcached'], category: 'Backend' },
    { name: 'CDN', aliases: ['cdn', 'content delivery network'], category: 'Backend' },
    { name: 'Event-Driven', aliases: ['event driven', 'event sourcing', 'cqrs'], category: 'Backend' },
    { name: 'Event Sourcing', aliases: ['event sourcing', 'cqrs', 'event store'], category: 'Backend' },
    { name: 'CQRS', aliases: ['cqrs', 'command query responsibility segregation'], category: 'Backend' },
    { name: 'Saga Pattern', aliases: ['saga', 'saga pattern', 'distributed transactions'], category: 'Backend' },
    { name: 'Distributed Transactions', aliases: ['distributed transactions', '2pc', '3pc'], category: 'Backend' },
    { name: 'Two-Phase Commit', aliases: ['two phase commit', '2pc'], category: 'Backend' },
    { name: 'Three-Phase Commit', aliases: ['three phase commit', '3pc'], category: 'Backend' },
    { name: 'Idempotency', aliases: ['idempotency', 'idempotent', 'safe retry'], category: 'Backend' },
    { name: 'Backpressure', aliases: ['backpressure', 'flow control', 'reactive'], category: 'Backend' },
    { name: 'Reactive Programming', aliases: ['reactive programming', 'rx', 'async'], category: 'Backend' },
    { name: 'RxJava', aliases: ['rxjava', 'reactive extensions java'], category: 'Backend' },
    { name: 'Project Reactor', aliases: ['project reactor', 'reactor', 'reactive java'], category: 'Backend' },
    { name: 'Akka', aliases: ['akka', 'akka toolkit', 'actor model'], category: 'Backend' },
    { name: 'Vert.x', aliases: ['vert.x', 'vertx', 'reactive'], category: 'Backend' },
    { name: 'Spring WebFlux', aliases: ['spring webflux', 'reactive spring'], category: 'Backend' },
    { name: 'Node.js Streams', aliases: ['node streams', 'stream', 'pipe'], category: 'Backend' },
    { name: 'Async/Await', aliases: ['async await', 'promises', 'async javascript'], category: 'Backend' },
    { name: 'Promises', aliases: ['promises', 'promise', 'async'], category: 'Backend' },
    { name: 'Callbacks', aliases: ['callbacks', 'callback', 'async patterns'], category: 'Backend' },
    { name: 'Generators', aliases: ['generators', 'generator functions', 'yield'], category: 'Backend' },
    { name: 'Iterators', aliases: ['iterators', 'iteration', 'iterable'], category: 'Backend' },
    { name: 'Observables', aliases: ['observables', 'observable', 'rx'], category: 'Backend' },
    { name: 'Subjects', aliases: ['subjects', 'subject', 'rx'], category: 'Backend' },
    { name: 'Streams', aliases: ['streams', 'streaming', 'data streams'], category: 'Backend' },
    { name: 'Pipelines', aliases: ['pipelines', 'pipeline', 'data flow'], category: 'Backend' },
    { name: 'Message Queues', aliases: ['message queue', 'mq', 'messaging'], category: 'Backend' },
    { name: 'Message Brokers', aliases: ['message broker', 'broker', 'messaging'], category: 'Backend' },
    { name: 'Event Bus', aliases: ['event bus', 'eventbus', 'messaging'], category: 'Backend' },
    { name: 'Event Loops', aliases: ['event loop', 'eventloop', 'async'], category: 'Backend' },
    { name: 'Thread Pools', aliases: ['thread pool', 'threadpool', 'concurrency'], category: 'Backend' },
    { name: 'Worker Threads', aliases: ['worker threads', 'threads', 'parallelism'], category: 'Backend' },
    { name: 'Child Processes', aliases: ['child processes', 'process', 'multiprocessing'], category: 'Backend' },
    { name: 'Clustering', aliases: ['clustering', 'cluster', 'multi process'], category: 'Backend' },
    { name: 'Process Management', aliases: ['process management', 'process', 'supervisor'], category: 'Backend' },
    { name: 'Signal Handling', aliases: ['signals', 'signal handling', 'process signals'], category: 'Backend' },
    { name: 'Error Handling', aliases: ['error handling', 'exception handling', 'try catch'], category: 'Backend' },
    { name: 'Exception Handling', aliases: ['exception handling', 'error handling', 'try catch'], category: 'Backend' },
    { name: 'Logging', aliases: ['logging', 'log', 'log management'], category: 'Backend' },
    { name: 'Structured Logging', aliases: ['structured logging', 'json logging', 'log format'], category: 'Backend' },
    { name: 'Log Aggregation', aliases: ['log aggregation', 'centralized logging'], category: 'Backend' },
    { name: 'Monitoring', aliases: ['monitoring', 'observability', 'application monitoring'], category: 'Backend' },
    { name: 'Metrics', aliases: ['metrics', 'application metrics', 'performance metrics'], category: 'Backend' },
    { name: 'Tracing', aliases: ['tracing', 'distributed tracing', 'request tracing'], category: 'Backend' },
    { name: 'Profiling', aliases: ['profiling', 'performance profiling', 'code profiling'], category: 'Backend' },
    { name: 'Debugging', aliases: ['debugging', 'debug', 'troubleshooting'], category: 'Backend' },
    { name: 'Testing', aliases: ['testing', 'unit testing', 'integration testing'], category: 'Backend' },
    { name: 'Unit Testing', aliases: ['unit testing', 'unit tests', 'tdd'], category: 'Backend' },
    { name: 'Integration Testing', aliases: ['integration testing', 'integration tests'], category: 'Backend' },
    { name: 'End-to-End Testing', aliases: ['e2e testing', 'end to end testing'], category: 'Backend' },
    { name: 'Contract Testing', aliases: ['contract testing', 'pact', 'consumer driven contracts'], category: 'Backend' },
    { name: 'Property-Based Testing', aliases: ['property based testing', 'pbt', 'quickcheck'], category: 'Backend' },
    { name: 'Mutation Testing', aliases: ['mutation testing', 'mutation analysis'], category: 'Backend' },
    { name: 'Test Coverage', aliases: ['test coverage', 'code coverage', 'coverage'], category: 'Backend' },
    { name: 'Mocking', aliases: ['mocking', 'mocks', 'test doubles'], category: 'Backend' },
    { name: 'Stubbing', aliases: ['stubbing', 'stubs', 'test doubles'], category: 'Backend' },
    { name: 'Faking', aliases: ['faking', 'fakes', 'test doubles'], category: 'Backend' },
    { name: 'Test Doubles', aliases: ['test doubles', 'mocks stubs fakes'], category: 'Backend' },
    { name: 'TDD', aliases: ['tdd', 'test driven development', 'test first'], category: 'Backend' },
    { name: 'BDD', aliases: ['bdd', 'behavior driven development'], category: 'Backend' },
    { name: 'ATDD', aliases: ['atdd', 'acceptance test driven development'], category: 'Backend' },
    { name: 'Authentication', aliases: ['authentication', 'auth', 'login', 'signin'], category: 'Backend' },
    { name: 'Authorization', aliases: ['authorization', 'rbac', 'access control', 'permissions'], category: 'Backend' },
    { name: 'OAuth', aliases: ['oauth', 'oauth2', 'open authorization'], category: 'Backend' },
    { name: 'OAuth2', aliases: ['oauth2', 'oauth 2', 'open authorization'], category: 'Backend' },
    { name: 'OpenID Connect', aliases: ['openid connect', 'oidc', 'authentication'], category: 'Backend' },
    { name: 'SAML', aliases: ['saml', 'security assertion markup language', 'sso'], category: 'Backend' },
    { name: 'JWT', aliases: ['jwt', 'json web token', 'token auth'], category: 'Backend' },
    { name: 'Session Management', aliases: ['session', 'session management', 'cookies'], category: 'Backend' },
    { name: 'Cookies', aliases: ['cookies', 'http cookies', 'browser cookies'], category: 'Backend' },
    { name: 'CSRF Protection', aliases: ['csrf', 'csrf protection', 'cross site request forgery'], category: 'Backend' },
    { name: 'XSS Protection', aliases: ['xss', 'xss protection', 'cross site scripting'], category: 'Backend' },
    { name: 'SQL Injection Prevention', aliases: ['sql injection', 'sql injection prevention', 'security'], category: 'Backend' },
    { name: 'Input Validation', aliases: ['input validation', 'data validation', 'sanitization'], category: 'Backend' },
    { name: 'Output Encoding', aliases: ['output encoding', 'escaping', 'xss prevention'], category: 'Backend' },
    { name: 'Content Security Policy', aliases: ['csp', 'content security policy', 'security headers'], category: 'Backend' },
    { name: 'CORS', aliases: ['cors', 'cross origin resource sharing', 'api security'], category: 'Backend' },
    { name: 'API Security', aliases: ['api security', 'web security', 'endpoint security'], category: 'Backend' },
    { name: 'Rate Limiting', aliases: ['rate limiting', 'throttling', 'api protection'], category: 'Backend' },
    { name: 'API Versioning', aliases: ['api versioning', 'versioning', 'backward compatibility'], category: 'Backend' },
    { name: 'Webhooks', aliases: ['webhooks', 'webhook', 'callback', 'http callback'], category: 'Backend' },
    { name: 'Server-Sent Events', aliases: ['sse', 'server sent events', 'realtime'], category: 'Backend' },
    { name: 'Long Polling', aliases: ['long polling', 'comet', 'realtime'], category: 'Backend' },
    { name: 'Polling', aliases: ['polling', 'short polling', 'periodic requests'], category: 'Backend' },
    { name: 'Push Notifications', aliases: ['push notifications', 'web push', 'fcm'], category: 'Backend' },
    { name: 'Email', aliases: ['email', 'email sending', 'smtp'], category: 'Backend' },
    { name: 'SMTP', aliases: ['smtp', 'simple mail transfer protocol', 'email'], category: 'Backend' },
    { name: 'IMAP', aliases: ['imap', 'internet message access protocol', 'email'], category: 'Backend' },
    { name: 'POP3', aliases: ['pop3', 'post office protocol', 'email'], category: 'Backend' },
    { name: 'Nodemailer', aliases: ['nodemailer', 'email node'], category: 'Backend' },
    { name: 'SendGrid', aliases: ['sendgrid', 'email service'], category: 'Backend' },
    { name: 'Mailgun', aliases: ['mailgun', 'email service'], category: 'Backend' },
    { name: 'AWS SES', aliases: ['aws ses', 'simple email service', 'email'], category: 'Backend' },
    { name: 'File Upload', aliases: ['file upload', 'multipart', 'form data'], category: 'Backend' },
    { name: 'Multer', aliases: ['multer', 'file upload node'], category: 'Backend' },
    { name: 'Formidable', aliases: ['formidable', 'form parsing'], category: 'Backend' },
    { name: 'Busboy', aliases: ['busboy', 'multipart parsing'], category: 'Backend' },
    { name: 'Streaming', aliases: ['streaming', 'stream', 'data streaming'], category: 'Backend' },
    { name: 'File Processing', aliases: ['file processing', 'file manipulation'], category: 'Backend' },
    { name: 'Image Processing', aliases: ['image processing', 'image manipulation'], category: 'Backend' },
    { name: 'Sharp', aliases: ['sharp', 'image processing node'], category: 'Backend' },
    { name: 'Jimp', aliases: ['jimp', 'image processing node'], category: 'Backend' },
    { name: 'GM', aliases: ['gm', 'graphicsmagick', 'image processing'], category: 'Backend' },
    { name: 'ImageMagick', aliases: ['imagemagick', 'image processing'], category: 'Backend' },
    { name: 'Video Processing', aliases: ['video processing', 'video encoding'], category: 'Backend' },
    { name: 'FFmpeg', aliases: ['ffmpeg', 'video processing'], category: 'Backend' },
    { name: 'Audio Processing', aliases: ['audio processing', 'audio encoding'], category: 'Backend' },
    { name: 'PDF Generation', aliases: ['pdf generation', 'pdf creation'], category: 'Backend' },
    { name: 'PDFKit', aliases: ['pdfkit', 'pdf node'], category: 'Backend' },
    { name: 'Puppeteer PDF', aliases: ['puppeteer pdf', 'pdf generation'], category: 'Backend' },
    { name: 'Excel Processing', aliases: ['excel processing', 'spreadsheet'], category: 'Backend' },
    { name: 'XLSX', aliases: ['xlsx', 'excel', 'spreadsheet'], category: 'Backend' },
    { name: 'CSV Processing', aliases: ['csv processing', 'csv parsing'], category: 'Backend' },
    { name: 'XML Processing', aliases: ['xml processing', 'xml parsing'], category: 'Backend' },
    { name: 'JSON Processing', aliases: ['json processing', 'json parsing'], category: 'Backend' },
    { name: 'YAML Processing', aliases: ['yaml processing', 'yaml parsing'], category: 'Backend' },
    { name: 'Data Validation', aliases: ['data validation', 'validation', 'schema validation'], category: 'Backend' },
    { name: 'Schema Validation', aliases: ['schema validation', 'json schema', 'validation'], category: 'Backend' },
    { name: 'JSON Schema', aliases: ['json schema', 'schema', 'validation'], category: 'Backend' },
    { name: 'AJV', aliases: ['ajv', 'json schema validator'], category: 'Backend' },
    { name: 'Data Serialization', aliases: ['data serialization', 'serialization', 'marshalling'], category: 'Backend' },
    { name: 'Data Deserialization', aliases: ['data deserialization', 'deserialization', 'unmarshalling'], category: 'Backend' },
    { name: 'Marshalling', aliases: ['marshalling', 'serialization', 'data conversion'], category: 'Backend' },
    { name: 'Unmarshalling', aliases: ['unmarshalling', 'deserialization', 'data conversion'], category: 'Backend' },
    { name: 'Data Transformation', aliases: ['data transformation', 'etl', 'data conversion'], category: 'Backend' },
    { name: 'Data Mapping', aliases: ['data mapping', 'mapping', 'data conversion'], category: 'Backend' },
    { name: 'Object Mapping', aliases: ['object mapping', 'orm', 'dto'], category: 'Backend' },
    { name: 'DTO', aliases: ['dto', 'data transfer object', 'object mapping'], category: 'Backend' },
    { name: 'VO', aliases: ['vo', 'value object', 'ddd'], category: 'Backend' },
    { name: 'DAO', aliases: ['dao', 'data access object', 'pattern'], category: 'Backend' },
    { name: 'Repository Pattern', aliases: ['repository pattern', 'repository', 'data access'], category: 'Backend' },
    { name: 'Unit of Work', aliases: ['unit of work', 'uow', 'transaction pattern'], category: 'Backend' },
    { name: 'Active Record', aliases: ['active record', 'orm pattern'], category: 'Backend' },
    { name: 'Data Mapper', aliases: ['data mapper', 'orm pattern'], category: 'Backend' },
    { name: 'Table Data Gateway', aliases: ['table data gateway', 'table gateway', 'pattern'], category: 'Backend' },
    { name: 'Row Data Gateway', aliases: ['row data gateway', 'row gateway', 'pattern'], category: 'Backend' },
    { name: 'Identity Map', aliases: ['identity map', 'pattern', 'caching'], category: 'Backend' },
    { name: 'Lazy Loading', aliases: ['lazy loading', 'lazy load', 'performance'], category: 'Backend' },
    { name: 'Eager Loading', aliases: ['eager loading', 'eager load', 'performance'], category: 'Backend' },
    { name: 'N+1 Problem', aliases: ['n+1 problem', 'n plus one', 'performance'], category: 'Backend' },
    { name: 'Batch Processing', aliases: ['batch processing', 'batch', 'bulk operations'], category: 'Backend' },
    { name: 'Bulk Operations', aliases: ['bulk operations', 'batch operations', 'bulk insert'], category: 'Backend' },
    { name: 'Bulk Insert', aliases: ['bulk insert', 'batch insert', 'performance'], category: 'Backend' },
    { name: 'Bulk Update', aliases: ['bulk update', 'batch update', 'performance'], category: 'Backend' },
    { name: 'Bulk Delete', aliases: ['bulk delete', 'batch delete', 'performance'], category: 'Backend' },
    { name: 'Transaction Management', aliases: ['transaction management', 'transactions', 'acid'], category: 'Backend' },
    { name: 'ACID', aliases: ['acid', 'atomicity consistency isolation durability'], category: 'Backend' },
    { name: 'BASE', aliases: ['base', 'basically available soft state eventual consistency'], category: 'Backend' },
    { name: 'Isolation Levels', aliases: ['isolation levels', 'transaction isolation'], category: 'Backend' },
    { name: 'Locking', aliases: ['locking', 'locks', 'concurrency'], category: 'Backend' },
    { name: 'Optimistic Locking', aliases: ['optimistic locking', 'versioning', 'concurrency'], category: 'Backend' },
    { name: 'Pessimistic Locking', aliases: ['pessimistic locking', 'locks', 'concurrency'], category: 'Backend' },
    { name: 'Deadlocks', aliases: ['deadlocks', 'deadlock', 'concurrency'], category: 'Backend' },
    { name: 'Race Conditions', aliases: ['race conditions', 'race condition', 'concurrency'], category: 'Backend' },
    { name: 'Concurrency Control', aliases: ['concurrency control', 'concurrency', 'locking'], category: 'Backend' },
    { name: 'Parallel Processing', aliases: ['parallel processing', 'parallelism', 'concurrency'], category: 'Backend' },
    { name: 'Multithreading', aliases: ['multithreading', 'threads', 'concurrency'], category: 'Backend' },
    { name: 'Async Processing', aliases: ['async processing', 'async', 'concurrency'], category: 'Backend' },
    { name: 'Synchronous Processing', aliases: ['synchronous processing', 'sync', 'blocking'], category: 'Backend' },
    { name: 'Non-blocking I/O', aliases: ['non-blocking i/o', 'async i/o', 'event loop'], category: 'Backend' },
    { name: 'Blocking I/O', aliases: ['blocking i/o', 'sync i/o', 'blocking'], category: 'Backend' },
    { name: 'I/O Multiplexing', aliases: ['i/o multiplexing', 'select', 'epoll'], category: 'Backend' },
    { name: 'Event Loop', aliases: ['event loop', 'eventloop', 'async'], category: 'Backend' },
    { name: 'Reactor Pattern', aliases: ['reactor pattern', 'reactor', 'async pattern'], category: 'Backend' },
    { name: 'Proactor Pattern', aliases: ['proactor pattern', 'proactor', 'async pattern'], category: 'Backend' },
    { name: 'Actor Model', aliases: ['actor model', 'actors', 'concurrency'], category: 'Backend' },
    { name: 'CSP', aliases: ['csp', 'communicating sequential processes', 'concurrency'], category: 'Backend' },
    { name: 'STM', aliases: ['stm', 'software transactional memory', 'concurrency'], category: 'Backend' },
    { name: 'Software Transactional Memory', aliases: ['software transactional memory', 'stm', 'concurrency'], category: 'Backend' },
    { name: 'Memory Management', aliases: ['memory management', 'memory', 'performance'], category: 'Backend' },
    { name: 'Garbage Collection', aliases: ['garbage collection', 'gc', 'memory'], category: 'Backend' },
    { name: 'Memory Leaks', aliases: ['memory leaks', 'memory leak', 'debugging'], category: 'Backend' },
    { name: 'Performance Tuning', aliases: ['performance tuning', 'optimization', 'performance'], category: 'Backend' },
    { name: 'Profiling', aliases: ['profiling', 'performance profiling', 'optimization'], category: 'Backend' },
    { name: 'Benchmarking', aliases: ['benchmarking', 'benchmarks', 'performance'], category: 'Backend' },
    { name: 'Load Testing', aliases: ['load testing', 'performance testing', 'stress testing'], category: 'Backend' },
    { name: 'Stress Testing', aliases: ['stress testing', 'load testing', 'performance'], category: 'Backend' },
    { name: 'Performance Testing', aliases: ['performance testing', 'load testing', 'stress testing'], category: 'Backend' },
    { name: 'Capacity Planning', aliases: ['capacity planning', 'scalability', 'infrastructure'], category: 'Backend' },
    { name: 'Scalability', aliases: ['scalability', 'scale', 'performance'], category: 'Backend' },
    { name: 'Horizontal Scaling', aliases: ['horizontal scaling', 'scale out', 'sharding'], category: 'Backend' },
    { name: 'Vertical Scaling', aliases: ['vertical scaling', 'scale up', 'hardware'], category: 'Backend' },
    { name: 'Auto Scaling', aliases: ['auto scaling', 'elastic scaling', 'cloud'], category: 'Backend' },
    { name: 'Elastic Scaling', aliases: ['elastic scaling', 'auto scaling', 'cloud'], category: 'Backend' },
    { name: 'High Availability', aliases: ['high availability', 'ha', 'uptime'], category: 'Backend' },
    { name: 'Fault Tolerance', aliases: ['fault tolerance', 'resilience', 'reliability'], category: 'Backend' },
    { name: 'Disaster Recovery', aliases: ['disaster recovery', 'dr', 'backup'], category: 'Backend' },
    { name: 'Backup', aliases: ['backup', 'backups', 'data backup'], category: 'Backend' },
    { name: 'Restore', aliases: ['restore', 'data restore', 'backup restore'], category: 'Backend' },
    { name: 'Replication', aliases: ['replication', 'data replication', 'ha'], category: 'Backend' },
    { name: 'Failover', aliases: ['failover', 'ha', 'redundancy'], category: 'Backend' },
    { name: 'Redundancy', aliases: ['redundancy', 'ha', 'backup'], category: 'Backend' },
    { name: 'Data Consistency', aliases: ['data consistency', 'consistency', 'distributed systems'], category: 'Backend' },
    { name: 'Eventual Consistency', aliases: ['eventual consistency', 'consistency', 'distributed systems'], category: 'Backend' },
    { name: 'Strong Consistency', aliases: ['strong consistency', 'consistency', 'distributed systems'], category: 'Backend' },
    { name: 'CAP Theorem', aliases: ['cap theorem', 'consistency availability partition tolerance'], category: 'Backend' },
    { name: 'PACELC Theorem', aliases: ['pacelc theorem', 'cap theorem extension'], category: 'Backend' },
    { name: 'Distributed Systems', aliases: ['distributed systems', 'distributed computing', 'distributed architecture'], category: 'Backend' },
    { name: 'Distributed Computing', aliases: ['distributed computing', 'distributed systems'], category: 'Backend' },
    { name: 'Distributed Architecture', aliases: ['distributed architecture', 'distributed systems'], category: 'Backend' },
    { name: 'Distributed Algorithms', aliases: ['distributed algorithms', 'consensus', 'paxos'], category: 'Backend' },
    { name: 'Consensus', aliases: ['consensus', 'consensus algorithms', 'paxos raft'], category: 'Backend' },
    { name: 'Paxos', aliases: ['paxos', 'consensus algorithm', 'distributed'], category: 'Backend' },
    { name: 'Raft', aliases: ['raft', 'consensus algorithm', 'distributed'], category: 'Backend' },
    { name: 'Gossip Protocol', aliases: ['gossip protocol', 'gossip', 'distributed'], category: 'Backend' },
    { name: 'Leader Election', aliases: ['leader election', 'distributed', 'consensus'], category: 'Backend' },
    { name: 'Quorum', aliases: ['quorum', 'distributed', 'consensus'], category: 'Backend' },
    { name: 'Partition Tolerance', aliases: ['partition tolerance', 'network partitions', 'distributed'], category: 'Backend' },
    { name: 'Network Partitions', aliases: ['network partitions', 'partition tolerance', 'distributed'], category: 'Backend' },
    { name: 'Split Brain', aliases: ['split brain', 'distributed', 'ha'], category: 'Backend' },
    { name: 'Heartbeat', aliases: ['heartbeat', 'health check', 'distributed'], category: 'Backend' },
    { name: 'Health Checks', aliases: ['health check', 'health', 'monitoring'], category: 'Backend' },
    { name: 'Readiness Checks', aliases: ['readiness check', 'readiness', 'k8s'], category: 'Backend' },
    { name: 'Liveness Checks', aliases: ['liveness check', 'liveness', 'k8s'], category: 'Backend' },
    { name: 'Startup Probes', aliases: ['startup probe', 'startup', 'k8s'], category: 'Backend' },
    { name: 'Graceful Shutdown', aliases: ['graceful shutdown', 'shutdown', 'termination'], category: 'Backend' },
    { name: 'Zero Downtime', aliases: ['zero downtime', 'rolling update', 'deployment'], category: 'Backend' },
    { name: 'Rolling Update', aliases: ['rolling update', 'deployment', 'zero downtime'], category: 'Backend' },
    { name: 'Blue-Green Deployment', aliases: ['blue green deployment', 'blue green', 'deployment'], category: 'Backend' },
    { name: 'Canary Deployment', aliases: ['canary deployment', 'canary', 'deployment'], category: 'Backend' },
    { name: 'Feature Flags', aliases: ['feature flags', 'feature toggles', 'deployment'], category: 'Backend' },
    { name: 'Feature Toggles', aliases: ['feature toggles', 'feature flags', 'deployment'], category: 'Backend' },
    { name: 'A/B Testing', aliases: ['a/b testing', 'ab testing', 'split testing'], category: 'Backend' },
    { name: 'Dark Launch', aliases: ['dark launch', 'feature flags', 'deployment'], category: 'Backend' },
    { name: 'Phased Rollout', aliases: ['phased rollout', 'staged rollout', 'deployment'], category: 'Backend' },
    { name: 'Staged Rollout', aliases: ['staged rollout', 'phased rollout', 'deployment'], category: 'Backend' },
    { name: 'Deployment Strategies', aliases: ['deployment strategies', 'deployment', 'release'], category: 'Backend' },
    { name: 'Release Management', aliases: ['release management', 'release', 'deployment'], category: 'Backend' },
    { name: 'Version Control', aliases: ['version control', 'vcs', 'git'], category: 'Backend' },
    { name: 'Git', aliases: ['git', 'version control', 'vcs'], category: 'Backend' },
    { name: 'Git Flow', aliases: ['git flow', 'git workflow', 'branching'], category: 'Backend' },
    { name: 'GitHub Flow', aliases: ['github flow', 'git workflow', 'branching'], category: 'Backend' },
    { name: 'GitLab Flow', aliases: ['gitlabflow', 'git workflow', 'branching'], category: 'Backend' },
    { name: 'Trunk-Based Development', aliases: ['trunk based development', 'trunk', 'git workflow'], category: 'Backend' },
    { name: 'Branching Strategies', aliases: ['branching strategies', 'git workflow', 'branching'], category: 'Backend' },
    { name: 'Merge Strategies', aliases: ['merge strategies', 'git merge', 'branching'], category: 'Backend' },
    { name: 'Rebase', aliases: ['rebase', 'git rebase', 'branching'], category: 'Backend' },
    { name: 'Cherry-Pick', aliases: ['cherry pick', 'git cherry pick', 'branching'], category: 'Backend' },
    { name: 'Squash Merge', aliases: ['squash merge', 'git squash', 'branching'], category: 'Backend' },
    { name: 'Fast-Forward Merge', aliases: ['fast forward merge', 'git merge', 'branching'], category: 'Backend' },
    { name: 'Three-Way Merge', aliases: ['three way merge', 'git merge', 'branching'], category: 'Backend' },
    { name: 'Merge Conflicts', aliases: ['merge conflicts', 'git conflicts', 'branching'], category: 'Backend' },
    { name: 'Conflict Resolution', aliases: ['conflict resolution', 'merge conflicts', 'git'], category: 'Backend' },
    { name: 'Pull Requests', aliases: ['pull requests', 'pr', 'code review'], category: 'Backend' },
    { name: 'Merge Requests', aliases: ['merge requests', 'mr', 'code review'], category: 'Backend' },
    { name: 'Code Review', aliases: ['code review', 'pr review', 'mr review'], category: 'Backend' },
    { name: 'Peer Review', aliases: ['peer review', 'code review', 'quality'], category: 'Backend' },
    { name: 'Pair Programming', aliases: ['pair programming', 'pair coding', 'collaboration'], category: 'Backend' },
    { name: 'Mob Programming', aliases: ['mob programming', 'mob coding', 'collaboration'], category: 'Backend' },
    { name: 'Code Quality', aliases: ['code quality', 'clean code', 'quality'], category: 'Backend' },
    { name: 'Clean Code', aliases: ['clean code', 'code quality', 'best practices'], category: 'Backend' },
    { name: 'Code Smells', aliases: ['code smells', 'code quality', 'refactoring'], category: 'Backend' },
    { name: 'Refactoring', aliases: ['refactoring', 'code refactoring', 'code quality'], category: 'Backend' },
    { name: 'Technical Debt', aliases: ['technical debt', 'code debt', 'quality'], category: 'Backend' },
    { name: 'Code Standards', aliases: ['code standards', 'coding standards', 'style guide'], category: 'Backend' },
    { name: 'Style Guide', aliases: ['style guide', 'code standards', 'linting'], category: 'Backend' },
    { name: 'Linting', aliases: ['linting', 'linter', 'code quality'], category: 'Backend' },
    { name: 'Formatting', aliases: ['formatting', 'formatter', 'code style'], category: 'Backend' },
    { name: 'Code Style', aliases: ['code style', 'formatting', 'linting'], category: 'Backend' },
    { name: 'Best Practices', aliases: ['best practices', 'patterns', 'conventions'], category: 'Backend' },
    { name: 'Design Patterns', aliases: ['design patterns', 'patterns', 'architecture'], category: 'Backend' },
    { name: 'Architectural Patterns', aliases: ['architectural patterns', 'architecture', 'patterns'], category: 'Backend' },
    { name: 'SOLID Principles', aliases: ['solid principles', 'solid', 'oop'], category: 'Backend' },
    { name: 'DRY Principle', aliases: ['dry', 'don\'t repeat yourself', 'principle'], category: 'Backend' },
    { name: 'KISS Principle', aliases: ['kiss', 'keep it simple stupid', 'principle'], category: 'Backend' },
    { name: 'YAGNI Principle', aliases: ['yagni', 'you aren\'t gonna need it', 'principle'], category: 'Backend' },
    { name: 'Separation of Concerns', aliases: ['separation of concerns', 'soc', 'architecture'], category: 'Backend' },
    { name: 'Single Responsibility', aliases: ['single responsibility', 'srp', 'solid'], category: 'Backend' },
    { name: 'Open/Closed Principle', aliases: ['open closed principle', 'ocp', 'solid'], category: 'Backend' },
    { name: 'Liskov Substitution', aliases: ['liskov substitution', 'lsp', 'solid'], category: 'Backend' },
    { name: 'Interface Segregation', aliases: ['interface segregation', 'isp', 'solid'], category: 'Backend' },
    { name: 'Dependency Inversion', aliases: ['dependency inversion', 'dip', 'solid'], category: 'Backend' },
    { name: 'Dependency Injection', aliases: ['dependency injection', 'di', 'ioc'], category: 'Backend' },
    { name: 'Inversion of Control', aliases: ['inversion of control', 'ioc', 'di'], category: 'Backend' },
    { name: 'IoC Container', aliases: ['ioc container', 'di container', 'dependency injection'], category: 'Backend' },
    { name: 'Service Locator', aliases: ['service locator', 'pattern', 'di'], category: 'Backend' },
    { name: 'Factory Pattern', aliases: ['factory pattern', 'factory', 'creational pattern'], category: 'Backend' },
    { name: 'Abstract Factory', aliases: ['abstract factory', 'factory pattern', 'creational pattern'], category: 'Backend' },
    { name: 'Builder Pattern', aliases: ['builder pattern', 'builder', 'creational pattern'], category: 'Backend' },
    { name: 'Prototype Pattern', aliases: ['prototype pattern', 'prototype', 'creational pattern'], category: 'Backend' },
    { name: 'Singleton Pattern', aliases: ['singleton pattern', 'singleton', 'creational pattern'], category: 'Backend' },
    { name: 'Adapter Pattern', aliases: ['adapter pattern', 'adapter', 'structural pattern'], category: 'Backend' },
    { name: 'Bridge Pattern', aliases: ['bridge pattern', 'bridge', 'structural pattern'], category: 'Backend' },
    { name: 'Composite Pattern', aliases: ['composite pattern', 'composite', 'structural pattern'], category: 'Backend' },
    { name: 'Decorator Pattern', aliases: ['decorator pattern', 'decorator', 'structural pattern'], category: 'Backend' },
    { name: 'Facade Pattern', aliases: ['facade pattern', 'facade', 'structural pattern'], category: 'Backend' },
    { name: 'Flyweight Pattern', aliases: ['flyweight pattern', 'flyweight', 'structural pattern'], category: 'Backend' },
    { name: 'Proxy Pattern', aliases: ['proxy pattern', 'proxy', 'structural pattern'], category: 'Backend' },
    { name: 'Chain of Responsibility', aliases: ['chain of responsibility', 'chain', 'behavioral pattern'], category: 'Backend' },
    { name: 'Command Pattern', aliases: ['command pattern', 'command', 'behavioral pattern'], category: 'Backend' },
    { name: 'Interpreter Pattern', aliases: ['interpreter pattern', 'interpreter', 'behavioral pattern'], category: 'Backend' },
    { name: 'Iterator Pattern', aliases: ['iterator pattern', 'iterator', 'behavioral pattern'], category: 'Backend' },
    { name: 'Mediator Pattern', aliases: ['mediator pattern', 'mediator', 'behavioral pattern'], category: 'Backend' },
    { name: 'Memento Pattern', aliases: ['memento pattern', 'memento', 'behavioral pattern'], category: 'Backend' },
    { name: 'Observer Pattern', aliases: ['observer pattern', 'observer', 'behavioral pattern'], category: 'Backend' },
    { name: 'State Pattern', aliases: ['state pattern', 'state', 'behavioral pattern'], category: 'Backend' },
    { name: 'Strategy Pattern', aliases: ['strategy pattern', 'strategy', 'behavioral pattern'], category: 'Backend' },
    { name: 'Template Method', aliases: ['template method', 'template', 'behavioral pattern'], category: 'Backend' },
    { name: 'Visitor Pattern', aliases: ['visitor pattern', 'visitor', 'behavioral pattern'], category: 'Backend' },
    { name: 'MVC Pattern', aliases: ['mvc', 'model view controller', 'architecture pattern'], category: 'Backend' },
    { name: 'MVP Pattern', aliases: ['mvp', 'model view presenter', 'architecture pattern'], category: 'Backend' },
    { name: 'MVVM Pattern', aliases: ['mvvm', 'model view viewmodel', 'architecture pattern'], category: 'Backend' },
    { name: 'MVI Pattern', aliases: ['mvi', 'model view intent', 'architecture pattern'], category: 'Backend' },
    { name: 'Clean Architecture', aliases: ['clean architecture', 'onion architecture', 'architecture'], category: 'Backend' },
    { name: 'Onion Architecture', aliases: ['onion architecture', 'clean architecture', 'architecture'], category: 'Backend' },
    { name: 'Hexagonal Architecture', aliases: ['hexagonal architecture', 'ports and adapters', 'architecture'], category: 'Backend' },
    { name: 'Layered Architecture', aliases: ['layered architecture', 'n-tier', 'architecture'], category: 'Backend' },
    { name: 'N-Tier Architecture', aliases: ['n-tier', 'n tier', 'layered architecture'], category: 'Backend' },
    { name: 'Serverless Architecture', aliases: ['serverless architecture', 'serverless', 'architecture'], category: 'Backend' },
    { name: 'Event-Driven Architecture', aliases: ['event driven architecture', 'eda', 'architecture'], category: 'Backend' },
    { name: 'Microservices Architecture', aliases: ['microservices architecture', 'microservices', 'architecture'], category: 'Backend' },
    { name: 'Monolithic Architecture', aliases: ['monolithic architecture', 'monolith', 'architecture'], category: 'Backend' },
    { name: 'Modular Monolith', aliases: ['modular monolith', 'modular', 'architecture'], category: 'Backend' },
    { name: 'Service-Oriented Architecture', aliases: ['soa', 'service oriented architecture', 'architecture'], category: 'Backend' },
    { name: 'Domain-Driven Design', aliases: ['ddd', 'domain driven design', 'architecture'], category: 'Backend' },
    { name: 'DDD', aliases: ['ddd', 'domain driven design'], category: 'Backend' },
    { name: 'Domain Model', aliases: ['domain model', 'ddd', 'domain'], category: 'Backend' },
    { name: 'Bounded Context', aliases: ['bounded context', 'ddd', 'domain'], category: 'Backend' },
    { name: 'Aggregate', aliases: ['aggregate', 'ddd', 'domain'], category: 'Backend' },
    { name: 'Aggregate Root', aliases: ['aggregate root', 'ddd', 'domain'], category: 'Backend' },
    { name: 'Entity', aliases: ['entity', 'ddd', 'domain'], category: 'Backend' },
    { name: 'Value Object', aliases: ['value object', 'vo', 'ddd'], category: 'Backend' },
    { name: 'Repository', aliases: ['repository', 'ddd', 'domain'], category: 'Backend' },
    { name: 'Domain Service', aliases: ['domain service', 'ddd', 'domain'], category: 'Backend' },
    { name: 'Application Service', aliases: ['application service', 'ddd', 'application'], category: 'Backend' },
    { name: 'Infrastructure Service', aliases: ['infrastructure service', 'ddd', 'infrastructure'], category: 'Backend' },
    { name: 'Ubiquitous Language', aliases: ['ubiquitous language', 'ddd', 'domain'], category: 'Backend' },
    { name: 'Context Mapping', aliases: ['context mapping', 'ddd', 'integration'], category: 'Backend' },
    { name: 'Anti-Corruption Layer', aliases: ['anti-corruption layer', 'acl', 'ddd'], category: 'Backend' },
    { name: 'Shared Kernel', aliases: ['shared kernel', 'ddd', 'integration'], category: 'Backend' },
    { name: 'Conformist', aliases: ['conformist', 'ddd', 'integration'], category: 'Backend' },
    { name: 'Customer/Supplier', aliases: ['customer supplier', 'ddd', 'integration'], category: 'Backend' },
    { name: 'Partnership', aliases: ['partnership', 'ddd', 'integration'], category: 'Backend' },
    { name: 'Open Host Service', aliases: ['open host service', 'ohs', 'ddd'], category: 'Backend' },
    { name: 'Published Language', aliases: ['published language', 'ddd', 'integration'], category: 'Backend' },
    
    // Programming Languages
    { name: 'Python', aliases: ['python', 'python3', 'py'], category: 'Programming' },
    { name: 'Java', aliases: ['java', 'core java', 'java se'], category: 'Programming' },
    { name: 'C++', aliases: ['c++', 'cpp'], category: 'Programming' },
    { name: 'C#', aliases: ['c#', 'c sharp', 'csharp'], category: 'Programming' },
    { name: 'Go', aliases: ['go', 'golang', 'go lang'], category: 'Programming' },
    { name: 'Rust', aliases: ['rust', 'rust lang'], category: 'Programming' },
    { name: 'Swift', aliases: ['swift', 'swift programming'], category: 'Programming' },
    { name: 'Kotlin', aliases: ['kotlin', 'kotlin lang'], category: 'Programming' },
    { name: 'Ruby', aliases: ['ruby', 'ruby programming'], category: 'Programming' },
    { name: 'Scala', aliases: ['scala', 'scala lang'], category: 'Programming' },
    { name: 'R', aliases: ['r', 'r programming', 'r language'], category: 'Programming' },
    { name: 'MATLAB', aliases: ['matlab'], category: 'Programming' },
    { name: 'C', aliases: ['c programming', 'c language'], category: 'Programming' },
    { name: 'Shell Scripting', aliases: ['shell', 'bash', 'shell scripting', 'bash scripting'], category: 'Programming' },
    { name: 'PowerShell', aliases: ['powershell', 'ps'], category: 'Programming' },
    
    // Database
    { name: 'SQL', aliases: ['sql', 'mysql', 'postgresql', 'postgres', 'sqlite', 'structured query language'], category: 'Database' },
    { name: 'MongoDB', aliases: ['mongodb', 'mongo db', 'mongo', 'nosql'], category: 'Database' },
    { name: 'PostgreSQL', aliases: ['postgresql', 'postgres', 'psql'], category: 'Database' },
    { name: 'MySQL', aliases: ['mysql'], category: 'Database' },
    { name: 'Redis', aliases: ['redis', 'caching'], category: 'Database' },
    { name: 'Elasticsearch', aliases: ['elasticsearch', 'elastic', 'search engine'], category: 'Database' },
    { name: 'Firebase', aliases: ['firebase', 'firestore', 'google firebase'], category: 'Database' },
    { name: 'DynamoDB', aliases: ['dynamodb', 'amazon dynamodb'], category: 'Database' },
    { name: 'Cassandra', aliases: ['cassandra', 'apache cassandra'], category: 'Database' },
    { name: 'Neo4j', aliases: ['neo4j', 'graph database'], category: 'Database' },
    { name: 'ORM', aliases: ['orm', 'sequelize', 'typeorm', 'hibernate', 'object relational mapping'], category: 'Database' },
    
    // Cloud & DevOps
    { name: 'AWS', aliases: ['aws', 'amazon web services', 'amazon cloud'], category: 'Cloud' },
    { name: 'Azure', aliases: ['azure', 'microsoft azure'], category: 'Cloud' },
    { name: 'Google Cloud', aliases: ['google cloud', 'gcp', 'google cloud platform'], category: 'Cloud' },
    { name: 'Docker', aliases: ['docker', 'containerization', 'containers'], category: 'DevOps' },
    { name: 'Kubernetes', aliases: ['kubernetes', 'k8s', 'k8s orchestration'], category: 'DevOps' },
    { name: 'Terraform', aliases: ['terraform', 'infrastructure as code', 'iac'], category: 'DevOps' },
    { name: 'Ansible', aliases: ['ansible', 'configuration management'], category: 'DevOps' },
    { name: 'CI/CD', aliases: ['ci/cd', 'cicd', 'continuous integration', 'continuous deployment', 'jenkins', 'github actions', 'gitlab ci'], category: 'DevOps' },
    { name: 'Linux', aliases: ['linux', 'unix', 'linux administration'], category: 'DevOps' },
    { name: 'Nginx', aliases: ['nginx', 'web server', 'reverse proxy'], category: 'DevOps' },
    { name: 'Apache', aliases: ['apache', 'apache http server'], category: 'DevOps' },
    
    // Data Science & Machine Learning
    { name: 'Machine Learning', aliases: ['machine learning', 'ml', 'scikit-learn', 'sklearn'], category: 'Data' },
    { name: 'Deep Learning', aliases: ['deep learning', 'dl', 'neural networks'], category: 'Data' },
    { name: 'TensorFlow', aliases: ['tensorflow', 'tf'], category: 'Data' },
    { name: 'PyTorch', aliases: ['pytorch', 'torch'], category: 'Data' },
    { name: 'Keras', aliases: ['keras'], category: 'Data' },
    { name: 'Data Science', aliases: ['data science', 'data analysis', 'analytics'], category: 'Data' },
    { name: 'Pandas', aliases: ['pandas', 'data manipulation'], category: 'Data' },
    { name: 'NumPy', aliases: ['numpy', 'numerical computing'], category: 'Data' },
    { name: 'Matplotlib', aliases: ['matplotlib', 'data visualization'], category: 'Data' },
    { name: 'Seaborn', aliases: ['seaborn', 'visualization'], category: 'Data' },
    { name: 'Scikit-learn', aliases: ['scikit-learn', 'sklearn', 'machine learning library'], category: 'Data' },
    { name: 'Natural Language Processing', aliases: ['nlp', 'natural language processing', 'text mining'], category: 'Data' },
    { name: 'Computer Vision', aliases: ['computer vision', 'cv', 'image processing'], category: 'Data' },
    { name: 'Spark', aliases: ['spark', 'apache spark', 'pyspark'], category: 'Data' },
    { name: 'Hadoop', aliases: ['hadoop', 'apache hadoop', 'big data'], category: 'Data' },
    { name: 'Excel', aliases: ['excel', 'microsoft excel', 'spreadsheet'], category: 'Data' },
    { name: 'Tableau', aliases: ['tableau', 'data visualization'], category: 'Data' },
    { name: 'Power BI', aliases: ['power bi', 'powerbi', 'microsoft power bi'], category: 'Data' },
    { name: 'Looker', aliases: ['looker', 'google looker'], category: 'Data' },
    
    // Mobile Development
    { name: 'React Native', aliases: ['react native', 'rn', 'reactnative'], category: 'Mobile' },
    { name: 'Flutter', aliases: ['flutter', 'dart'], category: 'Mobile' },
    { name: 'iOS Development', aliases: ['ios', 'iphone', 'swift ios', 'xcode'], category: 'Mobile' },
    { name: 'Android Development', aliases: ['android', 'android studio', 'kotlin android'], category: 'Mobile' },
    { name: 'Mobile Development', aliases: ['mobile', 'mobile app', 'app development'], category: 'Mobile' },
    { name: 'SwiftUI', aliases: ['swiftui'], category: 'Mobile' },
    { name: 'Jetpack Compose', aliases: ['jetpack compose', 'android compose'], category: 'Mobile' },
    
    // Design & UI/UX
    { name: 'Figma', aliases: ['figma', 'figma design'], category: 'Design' },
    { name: 'Adobe XD', aliases: ['adobe xd', 'xd'], category: 'Design' },
    { name: 'Sketch', aliases: ['sketch', 'sketch design'], category: 'Design' },
    { name: 'UI/UX', aliases: ['ui/ux', 'ux design', 'ui design', 'user experience', 'user interface'], category: 'Design' },
    { name: 'User Research', aliases: ['user research', 'ux research', 'user testing'], category: 'Design' },
    { name: 'Wireframing', aliases: ['wireframing', 'wireframes', 'prototyping'], category: 'Design' },
    { name: 'Design Systems', aliases: ['design systems', 'component library'], category: 'Design' },
    { name: 'Accessibility', aliases: ['accessibility', 'a11y', 'wcag'], category: 'Design' },
    
    // Tools & Version Control
    { name: 'Git', aliases: ['git', 'github', 'gitlab', 'bitbucket', 'version control'], category: 'Tools' },
    { name: 'GitHub', aliases: ['github', 'git hub'], category: 'Tools' },
    { name: 'GitLab', aliases: ['gitlab', 'git lab'], category: 'Tools' },
    { name: 'Jira', aliases: ['jira', 'atlassian jira', 'project management'], category: 'Tools' },
    { name: 'Confluence', aliases: ['confluence', 'documentation'], category: 'Tools' },
    { name: 'Slack', aliases: ['slack', 'communication'], category: 'Tools' },
    { name: 'VS Code', aliases: ['vs code', 'visual studio code', 'code editor'], category: 'Tools' },
    { name: 'Postman', aliases: ['postman', 'api testing'], category: 'Tools' },
    { name: 'Swagger', aliases: ['swagger', 'openapi', 'api documentation'], category: 'Tools' },
    
    // Process & Methodologies
    { name: 'Agile', aliases: ['agile', 'scrum', 'kanban', 'agile methodology'], category: 'Process' },
    { name: 'Scrum', aliases: ['scrum', 'scrum master', 'sprint'], category: 'Process' },
    { name: 'Kanban', aliases: ['kanban', 'lean'], category: 'Process' },
    { name: 'DevOps', aliases: ['devops', 'development operations'], category: 'Process' },
    { name: 'Test-Driven Development', aliases: ['tdd', 'test driven development'], category: 'Process' },
    { name: 'Code Review', aliases: ['code review', 'pull request', 'pr review'], category: 'Process' },
    
    // Soft Skills
    { name: 'Communication', aliases: ['communication', 'presentation', 'stakeholder management', 'public speaking'], category: 'Soft Skill' },
    { name: 'Leadership', aliases: ['leadership', 'team lead', 'mentored', 'managed team', 'team management'], category: 'Soft Skill' },
    { name: 'Problem Solving', aliases: ['problem solving', 'critical thinking', 'analytical skills'], category: 'Soft Skill' },
    { name: 'Teamwork', aliases: ['teamwork', 'collaboration', 'cross-functional'], category: 'Soft Skill' },
    { name: 'Time Management', aliases: ['time management', 'prioritization', 'deadline management'], category: 'Soft Skill' },
    { name: 'Adaptability', aliases: ['adaptability', 'flexible', 'quick learner'], category: 'Soft Skill' },
    { name: 'Project Management', aliases: ['project management', 'pm', 'project coordination'], category: 'Soft Skill' },
    { name: 'Mentoring', aliases: ['mentoring', 'coaching', 'training'], category: 'Soft Skill' },
    
    // Security
    { name: 'Cybersecurity', aliases: ['cybersecurity', 'cyber security', 'infosec'], category: 'Security' },
    { name: 'OAuth', aliases: ['oauth', 'authentication', 'authorization'], category: 'Security' },
    { name: 'JWT', aliases: ['jwt', 'json web token', 'token authentication'], category: 'Security' },
    { name: 'HTTPS', aliases: ['https', 'ssl', 'tls', 'secure communication'], category: 'Security' },
    { name: 'OWASP', aliases: ['owasp', 'security standards', 'web security'], category: 'Security' },
    
    // Testing & QA
    { name: 'Unit Testing', aliases: ['unit testing', 'unit tests'], category: 'Testing' },
    { name: 'Integration Testing', aliases: ['integration testing', 'integration tests'], category: 'Testing' },
    { name: 'E2E Testing', aliases: ['e2e testing', 'end to end testing'], category: 'Testing' },
    { name: 'Test Automation', aliases: ['test automation', 'automated testing'], category: 'Testing' },
    { name: 'Selenium', aliases: ['selenium', 'browser automation'], category: 'Testing' },
    { name: 'QA', aliases: ['qa', 'quality assurance', 'quality control'], category: 'Testing' },
    
    // Blockchain & Web3
    { name: 'Blockchain', aliases: ['blockchain', 'distributed ledger'], category: 'Blockchain' },
    { name: 'Solidity', aliases: ['solidity', 'ethereum smart contracts'], category: 'Blockchain' },
    { name: 'Web3', aliases: ['web3', 'web3.js', 'ethereum'], category: 'Blockchain' },
    { name: 'Smart Contracts', aliases: ['smart contracts', 'ethereum contracts'], category: 'Blockchain' },
    
    // Internet of Things
    { name: 'IoT', aliases: ['iot', 'internet of things'], category: 'IoT' },
    { name: 'Embedded Systems', aliases: ['embedded systems', 'firmware', 'embedded programming'], category: 'IoT' },
    { name: 'Arduino', aliases: ['arduino', 'microcontroller'], category: 'IoT' },
    { name: 'Raspberry Pi', aliases: ['raspberry pi', 'raspi'], category: 'IoT' },
    
    // Game Development
    { name: 'Unity', aliases: ['unity', 'unity3d', 'unity game engine'], category: 'Game Dev' },
    { name: 'Unreal Engine', aliases: ['unreal engine', 'unreal', 'ue4', 'ue5'], category: 'Game Dev' },
    { name: 'Game Development', aliases: ['game development', 'game dev', 'gaming'], category: 'Game Dev' },
    
    // Other
    { name: 'API Design', aliases: ['api design', 'api architecture', 'restful design'], category: 'Backend' },
    { name: 'System Design', aliases: ['system design', 'architecture', 'scalable systems'], category: 'Architecture' },
    { name: 'Algorithm Design', aliases: ['algorithms', 'data structures', 'algorithm design'], category: 'Programming' },
    { name: 'Performance Optimization', aliases: ['performance', 'optimization', 'performance tuning'], category: 'Programming' },
];

const roleSkillMap = {
    frontend: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'REST APIs', 'Git', 'Redux', 'Next.js', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'SQL', 'MongoDB', 'REST APIs', 'Docker', 'AWS', 'Python', 'Django', 'Flask'],
    fullstack: ['JavaScript', 'React', 'Node.js', 'Express.js', 'SQL', 'MongoDB', 'REST APIs', 'Git', 'TypeScript', 'HTML', 'CSS'],
    data: ['Python', 'SQL', 'Excel', 'Tableau', 'Power BI', 'Data Science', 'Machine Learning', 'Pandas', 'NumPy', 'Statistics'],
    cloud: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'CI/CD'],
    design: ['Figma', 'UI/UX', 'HTML', 'CSS', 'Adobe XD', 'Sketch', 'User Research', 'Wireframing'],
    mobile: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Mobile Development', 'Swift', 'Kotlin'],
    devops: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure', 'Linux', 'Terraform', 'Ansible', 'Git'],
    security: ['Cybersecurity', 'OAuth', 'JWT', 'HTTPS', 'OWASP', 'Network Security'],
    ml: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Data Science', 'Statistics'],
    blockchain: ['Blockchain', 'Solidity', 'Web3', 'Smart Contracts', 'Cryptography'],
    qa: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'Test Automation', 'Selenium', 'QA'],
    game: ['Unity', 'Unreal Engine', 'Game Development', 'C#', 'C++', '3D Graphics'],
    iot: ['IoT', 'Embedded Systems', 'Arduino', 'Raspberry Pi', 'C', 'C++', 'Python']
};

// Helper functions
async function extractTextFromResume(filePath, fileExtension) {
    console.log('[DEBUG] extractTextFromResume START - filePath:', filePath, 'extension:', fileExtension);
    const buffer = fs.readFileSync(filePath);
    console.log('[DEBUG] File read into buffer, size:', buffer.length);

    if (fileExtension === '.pdf') {
        console.log('[DEBUG] Processing PDF file...');
        try {
            const data = await pdfParse(buffer);
            console.log('[DEBUG] PDF text extracted, length:', data.text.length);
            const normalized = normalizeText(data.text);
            console.log('[DEBUG] Text normalized successfully');
            return normalized;
        } catch (error) {
            console.error('[DEBUG] ERROR in PDF parsing:', error);
            console.error('[DEBUG] Error stack:', error.stack);
            throw error;
        }
    }

    if (fileExtension === '.docx') {
        console.log('[DEBUG] Processing DOCX file...');
        const result = await mammoth.extractRawText({ buffer });
        console.log('[DEBUG] DOCX text extracted, length:', result.value.length);
        return normalizeText(result.value);
    }

    if (fileExtension === '.txt') {
        console.log('[DEBUG] Processing TXT file...');
        const text = buffer.toString('utf8');
        console.log('[DEBUG] TXT text extracted, length:', text.length);
        return normalizeText(text);
    }

    if (fileExtension === '.doc') {
        console.log('[DEBUG] ERROR: Legacy DOC file not supported');
        throw new Error('Legacy DOC files are not supported for text extraction. Please upload a DOCX, PDF, or TXT resume.');
    }

    console.log('[DEBUG] ERROR: Unsupported file format:', fileExtension);
    throw new Error('Unsupported resume file format.');
}

function normalizeText(text) {
    return (text || '')
        .replace(/\r/g, '\n')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function extractSkillsFromText(text) {
    const skillMatches = new Map();
    const lowerText = normalizeForSearch(text);
    const words = lowerText.split(/\s+/);
    
    skillOntology.forEach(skill => {
        let matchCount = 0;
        let contexts = [];
        
        skill.aliases.forEach(alias => {
            const aliasLower = alias.toLowerCase();
            if (containsPhrase(lowerText, aliasLower)) {
                matchCount++;
                
                // Check context: is it in a skills section, projects, or experience?
                const lines = text.split('\n');
                lines.forEach((line, lineNum) => {
                    const lineLower = line.toLowerCase();
                    if (lineLower.includes(aliasLower)) {
                        // Check surrounding context
                        const contextWindow = 3;
                        const startLine = Math.max(0, lineNum - contextWindow);
                        const endLine = Math.min(lines.length - 1, lineNum + contextWindow);
                        const contextLines = lines.slice(startLine, endLine + 1).join(' ').toLowerCase();
                        
                        // Boost confidence if found in skill-related context
                        if (contextLines.includes('skill') || contextLines.includes('technologie') || 
                            contextLines.includes('proficient') || contextLines.includes('expert') ||
                            contextLines.includes('experienced') || contextLines.includes('familiar')) {
                            contexts.push({ type: 'skills_section', weight: 3 });
                        }
                        // Boost confidence if found in project context
                        else if (contextLines.includes('project') || contextLines.includes('built') ||
                                   contextLines.includes('developed') || contextLines.includes('implemented') ||
                                   contextLines.includes('created') || contextLines.includes('designed')) {
                            contexts.push({ type: 'project', weight: 2 });
                        }
                        // Boost confidence if found in experience context
                        else if (contextLines.includes('experience') || contextLines.includes('worked') ||
                                   contextLines.includes('responsible') || contextLines.includes('role') ||
                                   contextLines.includes('position') || contextLines.includes('job')) {
                            contexts.push({ type: 'experience', weight: 2 });
                        }
                        // Lower confidence if found in education/course context
                        else if (contextLines.includes('course') || contextLines.includes('class') ||
                                   contextLines.includes('learned') || contextLines.includes('training') ||
                                   contextLines.includes('certification') || contextLines.includes('certificate')) {
                            contexts.push({ type: 'education', weight: 1 });
                        }
                        else {
                            contexts.push({ type: 'general', weight: 1 });
                        }
                    }
                });
            }
        });
        
        if (matchCount > 0) {
            const baseConfidence = Math.min(matchCount * 0.3, 1);
            const contextBonus = contexts.reduce((sum, ctx) => sum + ctx.weight, 0) / Math.max(contexts.length, 1) * 0.2;
            const frequencyBonus = Math.min(matchCount * 0.1, 0.3);
            const confidence = Math.min(baseConfidence + contextBonus + frequencyBonus, 1);
            
            skillMatches.set(skill.name, {
                skill: skill.name,
                category: skill.category,
                confidence: confidence,
                matchCount: matchCount,
                contexts: contexts
            });
        }
    });
    
    // Return skills with confidence above threshold
    const threshold = 0.3;
    return Array.from(skillMatches.values())
        .filter(match => match.confidence >= threshold)
        .sort((a, b) => b.confidence - a.confidence)
        .map(match => match.skill);
}

function extractSoftSkills(text) {
    const softSkills = new Set();
    const lowerText = normalizeForSearch(text);
    
    // Leadership indicators
    const leadershipPatterns = [
        /\b(?:led|lead|leadership|managed|managing|supervised|supervising|directed|guided|mentored|mentoring|coached|coaching|trained|training|head of|chief of)\b/gi,
        /\b(?:team lead|team leader|manager|supervisor|director|senior|principal|architect)\b/gi,
        /\b(?:spearheaded|initiated|founded|co-founded|started|launched)\b/gi
    ];
    
    // Communication indicators
    const communicationPatterns = [
        /\b(?:presented|presentation|public speaking|spoke|speaking|communicated|communication|negotiated|negotiation|wrote|writing|authored|published|documented)\b/gi,
        /\b(?:collaborated|collaboration|worked with|partnered|coordinated|liaison|interface|interfaced)\b/gi,
        /\b(?:stakeholder|client|customer|user|business|technical|cross-functional|cross team)\b/gi
    ];
    
    // Problem-solving indicators
    const problemSolvingPatterns = [
        /\b(?:solved|solution|problem|challenge|issue|bug|debug|debugged|troubleshoot|troubleshooting|fixed|fixing|resolved|resolving)\b/gi,
        /\b(?:analyzed|analysis|analytical|critical thinking|research|investigated|investigation|diagnosed|diagnosis)\b/gi,
        /\b(?:optimized|optimization|improved|improvement|enhanced|enhancement|refactored|refactoring)\b/gi
    ];
    
    // Teamwork indicators
    const teamworkPatterns = [
        /\b(?:team|collaborat|cooperat|partner|joint|shared|together|group|squad|crew|unit)\b/gi,
        /\b(?:agile|scrum|kanban|standup|retrospective|sprint|iteration|release|deploy|deployment)\b/gi,
        /\b(?:code review|pull request|merge request|peer review|pair programming|mob programming)\b/gi
    ];
    
    // Adaptability indicators
    const adaptabilityPatterns = [
        /\b(?:adapt|adaptable|flexible|versatile|pivot|pivoted|learned|learning|quick learner|fast learner|self-taught)\b/gi,
        /\b(?:new|novel|innovative|innovation|creative|creativity|experiment|experimental)\b/gi,
        /\b(?:changed|changing|transition|transitioned|evolved|evolving|modernized|modernization)\b/gi
    ];
    
    // Project management indicators
    const projectManagementPatterns = [
        /\b(?:project|managed|management|planned|planning|scheduled|timeline|deadline|milestone|deliverable)\b/gi,
        /\b(?:agile|scrum|kanban|waterfall|methodology|process|workflow|pipeline|lifecycle)\b/gi,
        /\b(?:jira|trello|asana|confluence|notion|monday|clickup|basecamp)\b/gi
    ];
    
    // Check each pattern category
    const patterns = {
        Leadership: leadershipPatterns,
        Communication: communicationPatterns,
        'Problem Solving': problemSolvingPatterns,
        Teamwork: teamworkPatterns,
        Adaptability: adaptabilityPatterns,
        'Project Management': projectManagementPatterns
    };
    
    Object.entries(patterns).forEach(([category, patternList]) => {
        patternList.forEach(pattern => {
            const matches = lowerText.match(pattern);
            if (matches && matches.length >= 2) {
                softSkills.add(category);
            }
        });
    });
    
    return Array.from(softSkills);
}

function extractEducation(text) {
    const educationSection = getSection(text, ['education', 'academic background', 'academics']);
    const source = educationSection || text;
    const degrees = [
        'Bachelor', 'B.Tech', 'B.E', 'BSc', 'BCA', 'Master', 'M.Tech', 'M.E', 'MSc', 'MCA',
        'MBA', 'PhD', 'Diploma', 'High School', 'Intermediate'
    ];
    const foundDegrees = degrees.filter(degree => new RegExp(`\\b${escapeRegExp(degree)}\\b`, 'i').test(source));
    const lines = extractMeaningfulLines(educationSection || '', 8);

    return {
        found: foundDegrees.length > 0 || lines.length > 0,
        degrees: Array.from(new Set(foundDegrees)),
        entries: lines
    };
}

function extractProjects(text) {
    const projectSection = getSection(text, ['projects', 'academic projects', 'personal projects']);
    const source = projectSection || '';
    const entries = extractBulletedEntries(source, 6);

    return {
        found: entries.length > 0 || /\b(project|built|developed|created|implemented)\b/i.test(source),
        entries
    };
}

function extractCertifications(text) {
    const certificationSection = getSection(text, ['certifications', 'certificates', 'licenses', 'courses']);
    const source = certificationSection || text;
    const certPattern = /\b(certified|certification|certificate|aws certified|azure|google cloud|scrum|pmp|coursera|udemy|nptel|oracle|microsoft)\b/i;
    const entries = extractMeaningfulLines(certificationSection || '', 8);

    return {
        found: entries.length > 0 || certPattern.test(source),
        entries
    };
}

function extractExperience(text) {
    const experienceSection = getSection(text, ['experience', 'work experience', 'professional experience', 'employment', 'internship']);
    const years = extractYearsOfExperience(text);
    const lines = extractBulletedEntries(experienceSection || '', 8);
    const hasExperienceKeywords = /\b(intern|developer|engineer|analyst|manager|associate|consultant|worked|responsible|led|built|managed)\b/i.test(experienceSection || text);

    return {
        found: years > 0 || lines.length > 0 || hasExperienceKeywords,
        totalYears: years,
        entries: lines
    };
}

function extractYearsOfExperience(text) {
    const matches = [...text.matchAll(/(\d+(?:\.\d+)?)\+?\s*(?:years?|yrs?)\s+(?:of\s+)?(?:professional\s+)?experience/gi)];
    const directYears = matches.map(match => Number(match[1])).filter(Number.isFinite);

    const ranges = [...text.matchAll(/(\d{4})\s*(?:-|to|\u2013|\u2014)\s*(present|current|\d{4})/gi)];
    const rangeYears = ranges.map(match => {
        const start = Number(match[1]);
        const end = /present|current/i.test(match[2]) ? new Date().getFullYear() : Number(match[2]);
        return end >= start ? end - start : 0;
    });

    return Math.max(0, ...directYears, ...rangeYears);
}

function extractExperienceLevel(text, years = 0) {
    const lowerText = text.toLowerCase();

    if (years >= 7 || lowerText.includes('senior') || lowerText.includes('lead ') || lowerText.includes('principal')) {
        return 'Senior';
    }

    if (years >= 4 || lowerText.includes('mid-level') || lowerText.includes('mid level')) {
        return 'Mid-level';
    }

    if (years >= 2 || lowerText.includes('junior')) {
        return 'Junior';
    }

    return 'Entry Level';
}

function getSection(text, headings) {
    const allHeadings = [
        'summary', 'objective', 'skills', 'technical skills', 'education', 'academic background',
        'experience', 'work experience', 'professional experience', 'employment', 'internship',
        'projects', 'academic projects', 'personal projects', 'certifications', 'certificates',
        'licenses', 'courses', 'achievements', 'awards', 'publications', 'languages'
    ];
    const escapedTargets = headings.map(escapeRegExp).join('|');
    const escapedAll = allHeadings.map(escapeRegExp).join('|');
    const sectionRegex = new RegExp(`(?:^|\\n)\\s*(?:${escapedTargets})\\s*:?\\s*\\n([\\s\\S]*?)(?=\\n\\s*(?:${escapedAll})\\s*:?\\s*(?:\\n|$)|$)`, 'i');
    const match = text.match(sectionRegex);

    return match ? match[1].trim() : '';
}

function extractMeaningfulLines(text, limit) {
    return text
        .split('\n')
        .map(line => line.replace(/^[-*\u2022\d.)\s]+/, '').trim())
        .filter(line => line.length >= 4 && line.length <= 180)
        .slice(0, limit);
}

function extractBulletedEntries(text, limit) {
    const lines = extractMeaningfulLines(text, limit);

    if (lines.length > 0) {
        return lines;
    }

    return text
        .split(/(?<=[.!?])\s+/)
        .map(line => line.trim())
        .filter(line => line.length >= 20 && line.length <= 220)
        .slice(0, limit);
}

function getStrengthAreas(skills, profile = {}) {
    const strengths = [];
    const categories = skills.reduce((groups, skillName) => {
        const skill = skillOntology.find(item => item.name === skillName);
        if (skill) groups[skill.category] = (groups[skill.category] || 0) + 1;
        return groups;
    }, {});

    Object.entries(categories).forEach(([category, count]) => {
        if (count >= 2) strengths.push(`${category} skill coverage`);
    });

    if (profile.projects?.found) strengths.push('Project experience is documented');
    if (profile.experience?.found) strengths.push('Work experience is represented');
    if (profile.certifications?.found) strengths.push('Certifications or courses are included');
    if (hasQuantifiedAchievements(profile.text || '')) strengths.push('Includes measurable achievements');

    return strengths.length > 0 ? strengths.slice(0, 6) : ['Resume includes readable professional information'];
}

function getImprovementAreas(skills, profile = {}) {
    const weaknesses = [];

    if (skills.length < 6) weaknesses.push('Add more role-relevant technical skills');
    if (!profile.education?.found) weaknesses.push('Add a clear education section');
    if (!profile.projects?.found) weaknesses.push('Add projects with tools used and outcomes');
    if (!profile.experience?.found) weaknesses.push('Add internships, freelance work, or practical experience');
    if (!profile.certifications?.found) weaknesses.push('Add relevant certifications or completed courses');
    if (!hasQuantifiedAchievements(profile.text || '')) weaknesses.push('Use numbers to show impact, scale, or results');
    if (!hasContactInfo(profile.text || '')) weaknesses.push('Include professional contact details');

    profile.missingSkills?.slice(0, 2).forEach(skill => {
        weaknesses.push(`Consider adding or learning ${skill}`);
    });

    return Array.from(new Set(weaknesses)).slice(0, 7);
}

function getMissingSkills(skills, careerGoal = '') {
    const normalizedGoal = normalizeForSearch(careerGoal);
    let targetRole = Object.keys(roleSkillMap).find(role => normalizedGoal.includes(role));

    if (!targetRole) {
        const categoryCounts = skills.reduce((counts, skillName) => {
            const skill = skillOntology.find(item => item.name === skillName);
            if (skill) counts[skill.category] = (counts[skill.category] || 0) + 1;
            return counts;
        }, {});

        if ((categoryCounts.Frontend || 0) >= 2) targetRole = 'frontend';
        else if ((categoryCounts.Backend || 0) >= 2) targetRole = 'backend';
        else if ((categoryCounts.Data || 0) >= 2) targetRole = 'data';
        else targetRole = 'fullstack';
    }

    const current = new Set(skills);
    return roleSkillMap[targetRole].filter(skill => !current.has(skill)).slice(0, 6);
}

function extractCareerInterests(profile) {
    const { detectedSkills, education, projects, experience, experienceLevel } = profile;
    const interests = [];
    
    // Extract from skills categories
    const categoryCounts = detectedSkills.reduce((counts, skillName) => {
        const skill = skillOntology.find(item => item.name === skillName);
        if (skill) counts[skill.category] = (counts[skill.category] || 0) + 1;
        return counts;
    }, {});

    // Build interest description based on dominant categories
    const sortedCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    
    if (sortedCategories.length > 0) {
        const categoryInterests = sortedCategories.map(([cat, count]) => {
            const catSkills = detectedSkills.filter(skillName => {
                const skill = skillOntology.find(item => item.name === skillName);
                return skill && skill.category === cat;
            }).slice(0, 3);
            
            return `${cat} development with ${catSkills.join(', ')}`;
        });
        interests.push(categoryInterests.join('. '));
    }

    // Extract from projects
    if (projects.found && projects.entries.length > 0) {
        const projectKeywords = projects.entries.slice(0, 2).join(' ');
        interests.push(`Building and implementing ${projectKeywords}`);
    }

    // Extract from experience
    if (experience.found && experience.entries.length > 0) {
        const expKeywords = experience.entries.slice(0, 2).join(' ');
        interests.push(`Professional experience in ${expKeywords}`);
    }

    // Extract from education
    if (education.found && education.degrees.length > 0) {
        interests.push(`Academic background in ${education.degrees.join(' and ')}`);
    }

    // Add experience level context
    if (experienceLevel) {
        interests.push(`Seeking ${experienceLevel.toLowerCase()} opportunities`);
    }

    return interests.join('. ').trim() || 'Exploring career opportunities in technology';
}

function inferPreferredLocation(text) {
    // Try to extract location from resume text
    const locationPatterns = [
        /\b(?:located|based|living|residing)\s+(?:in|at)\s+([A-Za-z\s]+?)(?:\n|,|\.|$)/i,
        /\b([A-Za-z\s]+?)(?:\s*,\s*[A-Z]{2})\b/g,
    ];
    
    for (const pattern of locationPatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            const location = match[1].trim();
            if (location.length > 2 && location.length < 30) {
                return location;
            }
        }
    }
    
    return '';
}

function inferWorkEnvironment(text) {
    const environments = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('startup') || lowerText.includes('entrepreneur')) {
        environments.push('startup');
    }
    if (lowerText.includes('enterprise') || lowerText.includes('corporate') || lowerText.includes('fortune')) {
        environments.push('corporate');
    }
    if (lowerText.includes('non-profit') || lowerText.includes('nonprofit') || lowerText.includes('ngo')) {
        environments.push('nonprofit');
    }
    if (lowerText.includes('freelance') || lowerText.includes('consultant') || lowerText.includes('contract')) {
        environments.push('freelance');
    }
    
    return environments;
}

function inferLearningGoals(detectedSkills, missingSkills) {
    const goals = [];
    
    if (missingSkills && missingSkills.length > 0) {
        goals.push(`Develop skills in ${missingSkills.slice(0, 3).join(', ')}`);
    }
    
    if (detectedSkills && detectedSkills.length > 0) {
        const advancedSkills = detectedSkills.filter(skill => {
            const skillInfo = skillOntology.find(item => item.name === skill);
            return skillInfo && ['Machine Learning', 'Deep Learning', 'System Design', 'Cloud', 'DevOps'].includes(skillInfo.category);
        });
        
        if (advancedSkills.length > 0) {
            goals.push(`Advance expertise in ${advancedSkills.slice(0, 2).join(' and ')}`);
        }
    }
    
    if (goals.length === 0) {
        goals.push('Continue professional development and skill expansion');
    }
    
    return goals.join('. ');
}

function calculateResumeScore(profile) {
    const skillScore = Math.min(profile.detectedSkills.length * 4, 28);
    const experienceScore = profile.experience.found ? Math.min(12 + profile.experience.totalYears * 2, 22) : 0;
    const educationScore = profile.education.found ? 14 : 0;
    const projectScore = profile.projects.found ? 12 : 0;
    const certificationScore = profile.certifications.found ? 8 : 0;
    const contactScore = hasContactInfo(profile.text) ? 6 : 0;
    const impactScore = hasQuantifiedAchievements(profile.text) ? 10 : 0;

    return clampScore(skillScore + experienceScore + educationScore + projectScore + certificationScore + contactScore + impactScore);
}

function calculateATSScore(profile) {
    const sectionScore = [
        profile.detectedSkills.length > 0,
        profile.education.found,
        profile.experience.found,
        profile.projects.found || profile.certifications.found
    ].filter(Boolean).length * 12;
    const keywordScore = Math.min(profile.detectedSkills.length * 5, 25);
    const contactScore = hasContactInfo(profile.text) ? 15 : 0;
    const lengthScore = profile.text.length >= 800 && profile.text.length <= 8000 ? 15 : 8;
    const formattingScore = /[^\x00-\x7F]/.test(profile.text.replace(/[\u2022\u2013\u2014]/g, '')) ? 5 : 10;

    return clampScore(sectionScore + keywordScore + contactScore + lengthScore + formattingScore);
}

function hasContactInfo(text) {
    return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text) || /(?:\+?\d[\d\s().-]{8,}\d)/.test(text);
}

function hasQuantifiedAchievements(text) {
    return /\b\d+(?:\.\d+)?\s*(?:%|percent|users?|clients?|projects?|months?|years?|hours?|revenue|sales|team|members?)\b/i.test(text);
}

function calculateOverallScore(skills, experienceLevel) {
    const levelBonus = {
        Senior: 22,
        'Mid-level': 18,
        Junior: 14,
        'Entry Level': 10
    }[experienceLevel] || 10;
    return clampScore(Math.min(skills.length * 4, 60) + levelBonus);
}

function findMatchingJobs(skills, experienceLevel) {
    return generateCareerRecommendations(skills, { experienceLevel })
        .map(career => ({
            id: career.id,
            title: career.title,
            requiredSkills: career.requiredSkills,
            experience: career.experience,
            description: career.description,
            matchPercentage: career.matchPercentage,
            matchingSkills: career.matchingSkills,
            missingSkills: career.missingSkills,
            whyItMatches: career.whyItMatches
        }));
}

function normalizeForSearch(text) {
    return ` ${(text || '').toLowerCase().replace(/[^\w+#./-]+/g, ' ')} `;
}

function containsPhrase(text, phrase) {
    const normalizedPhrase = escapeRegExp(phrase.toLowerCase()).replace(/\\ /g, '\\s+');
    return new RegExp(`(^|[^a-z0-9+#])${normalizedPhrase}([^a-z0-9+#]|$)`, 'i').test(text);
}

function clampScore(score) {
    return Math.max(0, Math.min(100, Math.round(score)));
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateDynamicCareerPaths(profile) {
    const { detectedSkills, softSkills, experienceLevel, education, projects } = profile;
    const skillSet = new Set(detectedSkills.map(skill => skill.toLowerCase()));
    
    // Analyze skill categories to determine dominant areas
    const categoryCounts = detectedSkills.reduce((counts, skillName) => {
        const skill = skillOntology.find(item => item.name === skillName);
        if (skill) counts[skill.category] = (counts[skill.category] || 0) + 1;
        return counts;
    }, {});
    
    // Boost match scores based on soft skills
    const softSkillBonus = softSkills ? softSkills.length * 2 : 0;

    // Generate career paths based on skill combinations
    const careerPaths = [];
    
    // Frontend-focused paths
    if ((categoryCounts.Frontend || 0) >= 2) {
        const frontendSkills = detectedSkills.filter(skill => {
            const s = skillOntology.find(item => item.name === skill);
            return s && s.category === 'Frontend';
        });
        
        careerPaths.push({
            id: 'dynamic-frontend-developer',
            title: 'Frontend Developer',
            icon: 'fas fa-laptop-code',
            match: calculateDynamicMatch(detectedSkills, ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript'], experienceLevel, softSkillBonus),
            featured: (categoryCounts.Frontend || 0) >= 3,
            description: 'Build responsive, interactive user interfaces using modern frontend technologies and frameworks.',
            details: generateSalaryDetails('frontend', experienceLevel),
            existing: frontendSkills.slice(0, 5),
            missing: getMissingSkillsForRole(detectedSkills, ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Redux', 'Next.js']),
        });
        
        if (detectedSkills.includes('React') || detectedSkills.includes('Vue.js') || detectedSkills.includes('Angular')) {
            careerPaths.push({
                id: 'dynamic-framework-specialist',
                title: `${detectedSkills.includes('React') ? 'React' : detectedSkills.includes('Vue.js') ? 'Vue.js' : 'Angular'} Developer`,
                icon: 'fab fa-react',
                match: calculateDynamicMatch(detectedSkills, ['JavaScript', 'React', 'TypeScript', 'Redux', 'Next.js'], experienceLevel, softSkillBonus),
                featured: false,
                description: `Specialize in building component-driven applications using ${detectedSkills.includes('React') ? 'React' : detectedSkills.includes('Vue.js') ? 'Vue.js' : 'Angular'} ecosystem.`,
                details: generateSalaryDetails('frontend', experienceLevel),
                existing: frontendSkills.filter(s => ['React', 'Vue.js', 'Angular', 'TypeScript', 'Redux'].includes(s)),
                missing: getMissingSkillsForRole(detectedSkills, ['JavaScript', 'React', 'TypeScript', 'Redux', 'Next.js', 'Jest']),
            });
        }
    }

    // Backend-focused paths
    if ((categoryCounts.Backend || 0) >= 2) {
        const backendSkills = detectedSkills.filter(skill => {
            const s = skillOntology.find(item => item.name === skill);
            return s && s.category === 'Backend';
        });
        
        careerPaths.push({
            id: 'dynamic-backend-developer',
            title: 'Backend Developer',
            icon: 'fas fa-server',
            match: calculateDynamicMatch(detectedSkills, ['Node.js', 'Express.js', 'Python', 'SQL', 'REST APIs'], experienceLevel, softSkillBonus),
            featured: (categoryCounts.Backend || 0) >= 3,
            description: 'Design and implement server-side applications, APIs, and database systems.',
            details: generateSalaryDetails('backend', experienceLevel),
            existing: backendSkills.slice(0, 5),
            missing: getMissingSkillsForRole(detectedSkills, ['Node.js', 'Express.js', 'Python', 'SQL', 'REST APIs', 'Docker']),
        });
    }

    // Full-stack paths
    if ((categoryCounts.Frontend || 0) >= 1 && (categoryCounts.Backend || 0) >= 1) {
        careerPaths.push({
            id: 'dynamic-fullstack-developer',
            title: 'Full Stack Developer',
            icon: 'fas fa-layer-group',
            match: calculateDynamicMatch(detectedSkills, ['JavaScript', 'React', 'Node.js', 'SQL', 'REST APIs'], experienceLevel, softSkillBonus),
            featured: true,
            description: 'Work across the entire technology stack to build complete web applications.',
            details: generateSalaryDetails('fullstack', experienceLevel),
            existing: detectedSkills.slice(0, 6),
            missing: getMissingSkillsForRole(detectedSkills, ['JavaScript', 'React', 'Node.js', 'SQL', 'REST APIs', 'Git', 'TypeScript']),
        });
    }

    // Data-focused paths
    if ((categoryCounts.Data || 0) >= 2 || detectedSkills.some(s => ['Python', 'R', 'SQL', 'Excel', 'Machine Learning'].includes(s))) {
        const dataSkills = detectedSkills.filter(skill => {
            const s = skillOntology.find(item => item.name === skill);
            return s && (s.category === 'Data' || ['Python', 'SQL', 'Excel'].includes(skill));
        });
        
        careerPaths.push({
            id: 'dynamic-data-analyst',
            title: 'Data Analyst',
            icon: 'fas fa-chart-line',
            match: calculateDynamicMatch(detectedSkills, ['Python', 'SQL', 'Excel', 'Data Science', 'Tableau'], experienceLevel, softSkillBonus),
            featured: (categoryCounts.Data || 0) >= 3,
            description: 'Analyze data to generate insights, create visualizations, and support data-driven decision making.',
            details: generateSalaryDetails('data', experienceLevel),
            existing: dataSkills.slice(0, 5),
            missing: getMissingSkillsForRole(detectedSkills, ['Python', 'SQL', 'Excel', 'Tableau', 'Power BI', 'Statistics']),
        });
        
        if (detectedSkills.includes('Machine Learning') || detectedSkills.includes('Deep Learning')) {
            careerPaths.push({
                id: 'dynamic-ml-engineer',
                title: 'Machine Learning Engineer',
                icon: 'fas fa-brain',
                match: calculateDynamicMatch(detectedSkills, ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science'], experienceLevel, softSkillBonus),
                featured: false,
                description: 'Build, deploy, and maintain machine learning models and AI systems.',
                details: generateSalaryDetails('ml', experienceLevel),
                existing: dataSkills.filter(s => ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Python'].includes(s)),
                missing: getMissingSkillsForRole(detectedSkills, ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'SQL', 'Cloud']),
            });
        }
    }

    // Cloud/DevOps paths
    if ((categoryCounts.Cloud || 0) >= 1 || (categoryCounts.DevOps || 0) >= 1) {
        const cloudSkills = detectedSkills.filter(skill => {
            const s = skillOntology.find(item => item.name === skill);
            return s && (s.category === 'Cloud' || s.category === 'DevOps');
        });
        
        careerPaths.push({
            id: 'dynamic-cloud-engineer',
            title: 'Cloud/DevOps Engineer',
            icon: 'fas fa-cloud',
            match: calculateDynamicMatch(detectedSkills, ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'], experienceLevel, softSkillBonus),
            featured: (categoryCounts.Cloud || 0) >= 2 || (categoryCounts.DevOps || 0) >= 2,
            description: 'Design and manage cloud infrastructure, deployment pipelines, and scalable systems.',
            details: generateSalaryDetails('cloud', experienceLevel),
            existing: cloudSkills.slice(0, 5),
            missing: getMissingSkillsForRole(detectedSkills, ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform']),
        });
    }

    // Mobile paths
    if ((categoryCounts.Mobile || 0) >= 1 || detectedSkills.some(s => ['React Native', 'Flutter', 'iOS Development', 'Android Development'].includes(s))) {
        const mobileSkills = detectedSkills.filter(skill => {
            const s = skillOntology.find(item => item.name === skill);
            return s && s.category === 'Mobile';
        });
        
        careerPaths.push({
            id: 'dynamic-mobile-developer',
            title: 'Mobile App Developer',
            icon: 'fas fa-mobile-alt',
            match: calculateDynamicMatch(detectedSkills, ['React Native', 'Flutter', 'JavaScript', 'Mobile Development'], experienceLevel, softSkillBonus),
            featured: false,
            description: 'Build native and cross-platform mobile applications for iOS and Android.',
            details: generateSalaryDetails('mobile', experienceLevel),
            existing: mobileSkills.slice(0, 4),
            missing: getMissingSkillsForRole(detectedSkills, ['React Native', 'Flutter', 'JavaScript', 'Mobile Development', 'UI/UX']),
        });
    }

    // Design paths
    if ((categoryCounts.Design || 0) >= 2) {
        const designSkills = detectedSkills.filter(skill => {
            const s = skillOntology.find(item => item.name === skill);
            return s && s.category === 'Design';
        });
        
        careerPaths.push({
            id: 'dynamic-ui-ux-designer',
            title: 'UI/UX Designer',
            icon: 'fas fa-palette',
            match: calculateDynamicMatch(detectedSkills, ['Figma', 'UI/UX', 'User Research', 'Wireframing'], experienceLevel, softSkillBonus),
            featured: false,
            description: 'Design user-centered digital experiences through research, prototyping, and visual design.',
            details: generateSalaryDetails('design', experienceLevel),
            existing: designSkills.slice(0, 4),
            missing: getMissingSkillsForRole(detectedSkills, ['Figma', 'UI/UX', 'User Research', 'Wireframing', 'Adobe XD']),
        });
    }

    // If no specific paths generated, create general tech paths
    if (careerPaths.length === 0) {
        careerPaths.push({
            id: 'dynamic-software-engineer',
            title: 'Software Engineer',
            icon: 'fas fa-code',
            match: calculateDynamicMatch(detectedSkills, ['JavaScript', 'Python', 'Git', 'Problem Solving'], experienceLevel, softSkillBonus),
            featured: true,
            description: 'Develop software solutions across various domains and technologies.',
            details: generateSalaryDetails('general', experienceLevel),
            existing: detectedSkills.slice(0, 4),
            missing: getMissingSkillsForRole(detectedSkills, ['JavaScript', 'Python', 'Git', 'REST APIs', 'SQL']),
        });
    }

    // Sort by match percentage and mark top match as featured
    return careerPaths
        .sort((a, b) => b.match - a.match)
        .map((career, index) => ({
            ...career,
            featured: index === 0 || career.featured
        }))
        .slice(0, 6);
}

function calculateDynamicMatch(detectedSkills, requiredSkills, experienceLevel, softSkillBonus = 0) {
    const skillSet = new Set(detectedSkills.map(s => s.toLowerCase()));
    const matches = requiredSkills.filter(skill => skillSet.has(skill.toLowerCase()));
    const matchScore = (matches.length / requiredSkills.length) * 70;
    
    const experienceBonus = {
        'Senior': 15,
        'Mid-level': 10,
        'Junior': 5,
        'Entry Level': 0
    }[experienceLevel] || 0;
    
    return Math.min(95, Math.round(matchScore + experienceBonus + (detectedSkills.length * 1.5) + softSkillBonus));
}

function generateSalaryDetails(role, experienceLevel) {
    const baseSalaries = {
        frontend: { entry: [55, 75], mid: [75, 100], senior: [100, 140] },
        backend: { entry: [60, 80], mid: [80, 110], senior: [110, 150] },
        fullstack: { entry: [65, 85], mid: [85, 120], senior: [120, 160] },
        data: { entry: [55, 75], mid: [75, 100], senior: [100, 140] },
        ml: { entry: [70, 95], mid: [95, 130], senior: [130, 180] },
        cloud: { entry: [65, 90], mid: [90, 125], senior: [125, 170] },
        mobile: { entry: [60, 85], mid: [85, 115], senior: [115, 155] },
        design: { entry: [50, 70], mid: [70, 95], senior: [95, 130] },
        general: { entry: [50, 70], mid: [70, 95], senior: [95, 130] }
    };

    const level = experienceLevel === 'Senior' ? 'senior' : 
                  experienceLevel === 'Mid-level' ? 'mid' : 
                  experienceLevel === 'Junior' ? 'mid' : 'entry';
    
    const [min, max] = baseSalaries[role]?.[level] || baseSalaries.general[level];
    const growthRates = { frontend: 18, backend: 20, fullstack: 22, data: 25, ml: 35, cloud: 30, mobile: 22, design: 15, general: 15 };
    
    return [
        `$${min.toLocaleString()},000 - $${max.toLocaleString()},000/year`,
        `+${growthRates[role] || 20}% job growth`,
        'Remote & On-site'
    ];
}

function getMissingSkillsForRole(detectedSkills, roleSkills) {
    const skillSet = new Set(detectedSkills.map(s => s.toLowerCase()));
    return roleSkills
        .filter(skill => !skillSet.has(skill.toLowerCase()))
        .slice(0, 5);
}

function generateCareerRecommendations(currentSkills, options = {}) {
    const normalizedSkills = normalizeSkillList(currentSkills);
    const skillSet = new Set(normalizedSkills.map(skill => skill.toLowerCase()));
    const normalizedGoal = normalizeForSearch(options.careerGoal || '');

    return careerPathsDatabase
        .map(career => {
            const requiredMatches = career.requiredSkills.filter(skill => skillSet.has(skill.toLowerCase()));
            const preferredMatches = career.preferredSkills.filter(skill => skillSet.has(skill.toLowerCase()));
            const missingRequired = career.requiredSkills.filter(skill => !skillSet.has(skill.toLowerCase()));
            const missingPreferred = career.preferredSkills.filter(skill => !skillSet.has(skill.toLowerCase()));
            const matchedSkillCount = requiredMatches.length + preferredMatches.length;
            const totalSkillCount = career.requiredSkills.length + career.preferredSkills.length;
            const requiredScore = career.requiredSkills.length
                ? (requiredMatches.length / career.requiredSkills.length) * 70
                : 0;
            const preferredScore = career.preferredSkills.length
                ? (preferredMatches.length / career.preferredSkills.length) * 20
                : 0;
            const goalScore = normalizedGoal && careerMatchesGoal(career, normalizedGoal) ? 10 : 0;
            const experienceScore = experienceMatchesCareer(career.experience, options.experienceLevel) ? 5 : 0;
            const matchPercentage = clampScore(requiredScore + preferredScore + goalScore + experienceScore);
            const matchingSkills = [...requiredMatches, ...preferredMatches];
            const missingSkills = [...missingRequired, ...missingPreferred].slice(0, 6);

            return {
                id: career.id,
                title: career.title,
                match: matchPercentage,
                matchPercentage,
                requiredSkills: career.requiredSkills,
                preferredSkills: career.preferredSkills,
                matchingSkills,
                existing: matchingSkills,
                missingSkills,
                missing: missingSkills,
                whyItMatches: buildCareerMatchReason(career, matchingSkills, missingSkills, matchedSkillCount, totalSkillCount),
                description: career.description,
                experience: career.experience
            };
        })
        .sort((a, b) => {
            if (b.matchPercentage !== a.matchPercentage) return b.matchPercentage - a.matchPercentage;
            return a.missingSkills.length - b.missingSkills.length;
        });
}

function normalizeSkillList(skills) {
    if (!Array.isArray(skills)) return [];

    return skills
        .map(skill => {
            if (typeof skill === 'string') return skill;
            if (skill && typeof skill.name === 'string') return skill.name;
            return '';
        })
        .map(skill => {
            const matchedSkill = skillOntology.find(item => {
                const lowerSkill = skill.toLowerCase();
                return item.name.toLowerCase() === lowerSkill || item.aliases.some(alias => alias.toLowerCase() === lowerSkill);
            });
            return matchedSkill ? matchedSkill.name : skill.trim();
        })
        .filter(Boolean);
}

function careerMatchesGoal(career, normalizedGoal) {
    const careerText = normalizeForSearch(`${career.title} ${career.description}`);
    const goalPhrase = normalizedGoal.trim();
    const genericTerms = new Set(['role', 'job', 'career']);
    const goalTerms = goalPhrase
        .split(' ')
        .map(term => term.trim())
        .filter(term => term.length > 2 && !genericTerms.has(term));

    if (goalPhrase && careerText.includes(goalPhrase)) {
        return true;
    }

    return goalTerms.length > 0 && goalTerms.every(term => careerText.includes(term));
}

function experienceMatchesCareer(requiredExperience, userExperience) {
    if (!userExperience) return false;

    const order = {
        entry: 1,
        'entry level': 1,
        junior: 2,
        'mid-level': 3,
        mid: 3,
        senior: 4
    };
    const required = order[String(requiredExperience).toLowerCase()] || 1;
    const user = order[String(userExperience).toLowerCase()] || required;

    return user >= required;
}

function buildCareerMatchReason(career, matchingSkills, missingSkills, matchedSkillCount, totalSkillCount) {
    if (matchingSkills.length === 0) {
        return `This path can be a stretch goal; start by learning ${missingSkills.slice(0, 3).join(', ')}.`;
    }

    const strongestSkills = matchingSkills.slice(0, 4).join(', ');
    const coverage = `${matchedSkillCount} of ${totalSkillCount}`;
    const gapText = missingSkills.length > 0
        ? ` Key gaps to close: ${missingSkills.slice(0, 3).join(', ')}.`
        : ' You already cover the core skill set.';

    return `${career.title} matches because your resume shows ${strongestSkills}, covering ${coverage} target skills.${gapText}`;
}

function findJobMatches(skills, location, experienceLevel) {
    const recommendations = generateCareerRecommendations(skills, { experienceLevel });
    const normalizedLocation = location ? String(location).toLowerCase() : '';

    return recommendations.map(career => ({
        ...career,
        location: normalizedLocation === 'remote' ? 'Remote-friendly' : 'Location flexible'
    }));
}

module.exports = {
    analyzeResume,
    getSkillRecommendations,
    getJobMatches
};

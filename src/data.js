import learningResources from './learningResources.json';

export const careerPaths = [
  {
    title: 'Full-Stack Web Developer',
    icon: 'fas fa-code',
    match: 92,
    featured: true,
    description: 'Build end-to-end web applications using modern technologies like React, Node.js, and databases.',
    details: ['$65,000 - $95,000/year', '15% job growth', 'Remote & On-site'],
    existing: ['JavaScript', 'HTML/CSS', 'Git', 'Problem Solving'],
    missing: ['React.js', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Mobile App Developer',
    icon: 'fas fa-mobile-alt',
    match: 87,
    description: 'Create mobile applications for iOS and Android platforms using native or cross-platform technologies.',
    details: ['$70,000 - $105,000/year', '22% job growth', 'Hybrid work'],
    existing: ['JavaScript', 'Problem Solving', 'UI/UX Basics'],
    missing: ['React Native', 'Swift', 'Kotlin', 'Mobile Design'],
  },
  {
    title: 'Data Analyst',
    icon: 'fas fa-chart-bar',
    match: 81,
    description: 'Analyze data to help organizations make informed business decisions using statistics and visualization.',
    details: ['$55,000 - $85,000/year', '25% job growth', 'Remote friendly'],
    existing: ['Excel', 'Critical Thinking', 'Mathematics'],
    missing: ['Python', 'SQL', 'Tableau', 'Statistics'],
  },
];

export const skillPlans = [
  {
    title: 'React.js Development',
    icon: 'fab fa-react',
    priority: 'High Priority',
    className: 'high',
    description: 'Master the most popular frontend framework for building modern web applications.',
    path: [
      ['React Fundamentals Course', '20 hours', 'fas fa-play-circle'],
      ['Build 3 Projects', '40 hours', 'fas fa-code'],
      ['React Certification', '5 hours', 'fas fa-certificate'],
    ],
  },
  {
    title: 'Backend Development',
    icon: 'fas fa-server',
    priority: 'Medium Priority',
    className: 'medium',
    description: 'Learn server-side programming with Node.js and database management.',
    path: [
      ['Node.js Basics', '15 hours', 'fas fa-play-circle'],
      ['Database Design', '25 hours', 'fas fa-database'],
      ['API Development', '30 hours', 'fas fa-project-diagram'],
    ],
  },
  {
    title: 'Cloud Technologies',
    icon: 'fas fa-cloud',
    priority: 'Future Focus',
    className: 'low',
    description: 'Understand cloud platforms like AWS and Azure for scalable application deployment.',
    path: [
      ['Cloud Fundamentals', '12 hours', 'fas fa-play-circle'],
      ['AWS Basics', '20 hours', 'fas fa-tools'],
      ['Deployment Practice', '15 hours', 'fas fa-rocket'],
    ],
  },
];

export const learningContent = {
  'Full-Stack Web Developer': [
    ['Frontend Fundamentals', 'HTML5, CSS3, JavaScript ES6+, responsive layouts, and Git workflows.'],
    ['React Development', 'Components, hooks, routing patterns, state management, and API integration.'],
    ['Backend Development', 'Node.js, Express, database modeling, REST APIs, authentication, and security basics.'],
  ],
  'Mobile App Developer': [
    ['Mobile Fundamentals', 'Platform guidelines, mobile UX patterns, and app navigation models.'],
    ['React Native', 'Reusable components, native device features, state, testing, and app-store deployment.'],
  ],
  'Data Analyst': [
    ['Statistics & Excel', 'Statistical thinking, spreadsheet modeling, data cleaning, and visualization basics.'],
    ['Python & SQL', 'Pandas, NumPy, querying, joining, aggregating, and dashboard-ready datasets.'],
  ],
};

export const resources = learningResources;

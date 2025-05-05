// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Import education module
    import('./education.js')
        .then(module => {
            window.getEducationData = module.getEducationData;
            module.initializeEducation();
        })
        .catch(error => console.error('Error loading education module:', error));
        
    // Navigation Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Modal Elements
    const coverLetterBtn = document.getElementById('cover-letter-btn');
    const coverLetterModal = document.getElementById('cover-letter-modal');
    const educationModal = document.getElementById('education-modal');
    const experienceModal = document.getElementById('experience-modal');
    const projectModal = document.getElementById('project-modal');
    const settingsModal = document.getElementById('settings-modal');
    const closeButtons = document.querySelectorAll('.close');
    
    // Modal Content Elements
    const educationModalTitle = document.getElementById('education-modal-title');
    const educationModalContent = document.getElementById('education-modal-content');
    const experienceModalTitle = document.getElementById('experience-modal-title');
    const projectModalTitle = document.getElementById('project-modal-title');
    const projectModalContent = document.getElementById('project-modal-content');
    
    // Tab Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Theme Elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeOptions = document.querySelectorAll('.theme-option');
    const applyBtn = document.querySelector('.apply-btn');
    
    // View Buttons
    const educationViewButtons = document.querySelectorAll('#education .view-btn');
    const experienceViewButtons = document.querySelectorAll('#experience .view-btn');

    // Initialize the application
    initializeApp();

    // Navigation Function
    function initializeApp() {
        // Set default active section
        document.getElementById('main').classList.add('active');
        document.querySelector('.nav-link[href="#main"]').classList.add('active');
        
        // Load saved theme
        loadSavedTheme();
        
        // Setup event listeners
        setupEventListeners();
    }

    function setupEventListeners() {
        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavigation);
        });
        
        // Modal triggers
        coverLetterBtn.addEventListener('click', () => openModal(coverLetterModal));
        themeToggle.addEventListener('click', () => openModal(settingsModal));
        
        // Close buttons
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                closeAllModals();
            });
        });
        
        // Close modal when clicking outside content
        window.addEventListener('click', handleModalBackgroundClick);
        
        // Education view buttons
        educationViewButtons.forEach(button => {
            button.addEventListener('click', handleEducationView);
        });
        
        // Experience view buttons
        experienceViewButtons.forEach(button => {
            button.addEventListener('click', handleExperienceView);
        });
        
        // Tab functionality
        tabButtons.forEach(button => {
            button.addEventListener('click', handleTabClick);
        });
        
        // Theme options
        themeOptions.forEach(option => {
            option.addEventListener('click', handleThemeSelection);
        });
        
        // Apply theme button
        applyBtn.addEventListener('click', applyTheme);
        
        // Project details button delegation
        document.addEventListener('click', handleProjectDetailsClick);
    }

    // Navigation Handler
    function handleNavigation(e) {
        e.preventDefault();
        
        // Remove active class from all links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get the id of the section to show
        const sectionId = this.getAttribute('href').substring(1);
        document.getElementById(sectionId).classList.add('active');
    }

    // Modal Functions
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            closeModal(modal);
        });
    }

    function handleModalBackgroundClick(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }

    // Education View Handler
    function handleEducationView() {
        const id = this.getAttribute('data-id');
        
        // Use the imported education module function if available
        if (window.getEducationData) {
            const educationData = window.getEducationData(id);
            educationModalTitle.textContent = educationData.title;
            educationModalContent.innerHTML = educationData.content;
        } else {
            // Fallback to legacy function
            const educationData = getEducationData(id);
            educationModalTitle.textContent = educationData.title;
            educationModalContent.innerHTML = educationData.content;
        }
        
        openModal(educationModal);
    }

    // Experience View Handler
    function handleExperienceView() {
        const id = this.getAttribute('data-id');
        const experienceData = getExperienceData(id);
        
        experienceModalTitle.textContent = experienceData.title;
        
        // Populate tab content
        document.getElementById('summary').innerHTML = experienceData.summary;
        document.getElementById('projects').innerHTML = experienceData.projects;
        document.getElementById('achievements').innerHTML = experienceData.achievements;
        
        // Reset tabs to show summary first
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.querySelector('[data-tab="summary"]').classList.add('active');
        document.getElementById('summary').classList.add('active');
        
        openModal(experienceModal);
    }

    // Tab Handler
    function handleTabClick() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }

    // Theme Option Handler
    function handleThemeSelection() {
        themeOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
    }

    // Apply Theme Handler
    function applyTheme() {
        const selectedTheme = document.querySelector('.theme-option.active').getAttribute('data-theme');
        
        if (selectedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
        
        closeModal(settingsModal);
    }

    // Project Details Handler
    function handleProjectDetailsClick(e) {
        if (e.target.classList.contains('project-details-btn') || 
            e.target.parentElement.classList.contains('project-details-btn')) {
            
            const button = e.target.classList.contains('project-details-btn') ? 
                e.target : e.target.parentElement;
                
            const id = button.getAttribute('data-id');
            const projectData = getProjectData(id);
            
            projectModalTitle.textContent = projectData.title;
            projectModalContent.innerHTML = projectData.content;
            
            openModal(projectModal);
        }
    }

    // Load Saved Theme
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.querySelector('.theme-option[data-theme="dark"]').classList.add('active');
            document.querySelector('.theme-option[data-theme="light"]').classList.remove('active');
        }
    }

    // Data Functions
    function getEducationData(id) {
        const educationData = {
            'edu1': {
                title: 'Master of Computer Science',
                content: `
                    <div class="education-details">
                        <p><strong>Institution:</strong> Stanford University</p>
                        <p><strong>Duration:</strong> 2018 - 2020</p>
                        <p><strong>GPA:</strong> 3.92/4.0</p>
                        <p><strong>Area of Focus:</strong> Machine Learning and Artificial Intelligence</p>
                        
                        <h3>Key Courses</h3>
                        <ul>
                            <li>Advanced Algorithms</li>
                            <li>Machine Learning</li>
                            <li>Deep Learning</li>
                            <li>Computer Vision</li>
                            <li>Natural Language Processing</li>
                            <li>Distributed Systems</li>
                        </ul>
                        
                        <h3>Thesis</h3>
                        <p>"Optimizing Neural Networks for Edge Computing Applications"</p>
                        <p>Developed techniques to reduce the computational requirements of neural networks while maintaining accuracy, enabling deployment on resource-constrained devices.</p>
                        
                        <h3>Achievements</h3>
                        <ul>
                            <li>Dean's List: All semesters</li>
                            <li>Teaching Assistant for Introduction to Machine Learning</li>
                            <li>Published 2 papers in peer-reviewed conferences</li>
                        </ul>
                    </div>
                `
            },
            'edu2': {
                title: 'Bachelor of Science in Software Engineering',
                content: `
                    <div class="education-details">
                        <p><strong>Institution:</strong> MIT</p>
                        <p><strong>Duration:</strong> 2014 - 2018</p>
                        <p><strong>GPA:</strong> 3.85/4.0</p>
                        <p><strong>Area of Focus:</strong> Software Development and Systems Design</p>
                        
                        <h3>Key Courses</h3>
                        <ul>
                            <li>Data Structures and Algorithms</li>
                            <li>Object-Oriented Programming</li>
                            <li>Database Systems</li>
                            <li>Web Development</li>
                            <li>Software Engineering Principles</li>
                            <li>Computer Networks</li>
                        </ul>
                        
                        <h3>Capstone Project</h3>
                        <p>"Real-time Collaborative Code Editor with Integrated Version Control"</p>
                        <p>Developed a web-based collaborative code editor that allowed multiple users to edit code simultaneously with automatic conflict resolution and integrated Git functionality.</p>
                        
                        <h3>Achievements</h3>
                        <ul>
                            <li>Graduated with Honors</li>
                            <li>President of the Computer Science Club</li>
                            <li>2nd Place in MIT Hackathon 2017</li>
                        </ul>
                    </div>
                `
            },
            'edu3': {
                title: 'AWS Certified Solutions Architect',
                content: `
                    <div class="education-details">
                        <p><strong>Institution:</strong> Amazon Web Services</p>
                        <p><strong>Date:</strong> 2021</p>
                        <p><strong>Credential ID:</strong> AWS-ASA-123456</p>
                        <p><strong>Expiration:</strong> 2024</p>
                        
                        <h3>Skills Certified</h3>
                        <ul>
                            <li>Designing distributed systems on AWS</li>
                            <li>Planning and deploying high-availability architectures</li>
                            <li>Implementing security controls and compliance requirements</li>
                            <li>Cost optimization strategies</li>
                            <li>Migration planning and execution</li>
                        </ul>
                        
                        <h3>Projects Implemented Using AWS</h3>
                        <ul>
                            <li>Designed and deployed a serverless e-commerce platform</li>
                            <li>Implemented CI/CD pipelines for automated deployment</li>
                            <li>Migrated on-premise applications to AWS cloud</li>
                        </ul>
                    </div>
                `
            },
            'edu4': {
                title: 'Professional Scrum Master',
                content: `
                    <div class="education-details">
                        <p><strong>Institution:</strong> Scrum.org</p>
                        <p><strong>Date:</strong> 2020</p>
                        <p><strong>Credential ID:</strong> PSM-123456</p>
                        
                        <h3>Skills Certified</h3>
                        <ul>
                            <li>Facilitating Scrum events</li>
                            <li>Coaching development teams</li>
                            <li>Removing impediments</li>
                            <li>Promoting Scrum practices</li>
                            <li>Sprint planning and retrospectives</li>
                        </ul>
                        
                        <h3>Implementation Experience</h3>
                        <p>Successfully implemented Scrum methodology in 3 development teams, resulting in:</p>
                        <ul>
                            <li>30% increase in development velocity</li>
                            <li>Improved team collaboration and communication</li>
                            <li>Reduced time-to-market for new features</li>
                            <li>Enhanced product quality through regular feedback cycles</li>
                        </ul>
                    </div>
                `
            },
            'edu5': {
                title: 'Advanced React & Redux',
                content: `
                    <div class="education-details">
                        <p><strong>Institution:</strong> Udemy</p>
                        <p><strong>Date:</strong> 2019</p>
                        <p><strong>Instructor:</strong> Stephen Grider</p>
                        <p><strong>Certificate ID:</strong> UC-123456</p>
                        
                        <h3>Skills Acquired</h3>
                        <ul>
                            <li>Advanced React component patterns</li>
                            <li>Redux state management</li>
                            <li>Middleware and async actions</li>
                            <li>Testing React applications</li>
                            <li>React Hooks and Context API</li>
                            <li>Performance optimization</li>
                        </ul>
                        
                        <h3>Projects Completed</h3>
                        <ul>
                            <li>Authentication system with JWT</li>
                            <li>Streaming application with RTMP server</li>
                            <li>Testing suite with Jest and Enzyme</li>
                            <li>Higher-order components implementation</li>
                        </ul>
                    </div>
                `
            }
        };
        
        return educationData[id] || { 
            title: 'Education Details',
            content: '<p>No details available for this education.</p>'
        };
    }

    function getExperienceData(id) {
        const experienceData = {
            'exp1': {
                title: 'Senior Software Engineer at Google',
                summary: `
                    <div class="experience-summary">
                        <p><strong>Company:</strong> Google</p>
                        <p><strong>Duration:</strong> 2020 - Present</p>
                        <p><strong>Location:</strong> Mountain View, CA</p>
                        <p><strong>Team:</strong> Google Cloud Platform</p>
                        
                        <h3>Role Overview</h3>
                        <p>As a Senior Software Engineer in the Google Cloud Platform team, I am responsible for designing, developing, and maintaining scalable cloud services that power Google's enterprise offerings. My work focuses on improving system reliability, performance optimization, and implementing new features for the Container Engine service.</p>
                        
                        <h3>Key Responsibilities</h3>
                        <ul>
                            <li>Architect and implement scalable microservices</li>
                            <li>Optimize system performance and resource utilization</li>
                            <li>Collaborate with product managers to define feature roadmaps</li>
                            <li>Mentor junior engineers and conduct code reviews</li>
                            <li>Participate in on-call rotations to ensure service reliability</li>
                            <li>Design and implement automated testing frameworks</li>
                        </ul>
                        
                        <h3>Technologies</h3>
                        <p>Go, Python, Kubernetes, Docker, gRPC, Prometheus, BigQuery, Pub/Sub, Spanner</p>
                    </div>
                `,
                projects: `
                    <div class="project-list">
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Container Orchestration Service</h4>
                                <p>Redesigned scheduling algorithm for improved resource utilization</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj1">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Monitoring System Overhaul</h4>
                                <p>Implemented real-time metrics collection and alerting system</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj2">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Service Mesh Implementation</h4>
                                <p>Led the adoption of Istio for improved traffic management</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj3">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Autoscaling Framework</h4>
                                <p>Developed predictive autoscaling system based on historical patterns</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj4">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                    </div>
                `,
                achievements: `
                    <div class="achievement-list-container">
                        <ul class="achievement-list">
                            <li class="achievement-item">Reduced service latency by 40% through optimizing the request processing pipeline</li>
                            <li class="achievement-item">Implemented a new container scheduling algorithm that improved resource utilization by 25%</li>
                            <li class="achievement-item">Led a team of 5 engineers in redesigning the monitoring system, resulting in 60% faster incident detection</li>
                            <li class="achievement-item">Recognized with Google Peer Bonus award for exceptional contributions to service reliability</li>
                            <li class="achievement-item">Published 2 technical papers on scalable system design in Google's engineering blog</li>
                            <li class="achievement-item">Mentored 4 junior engineers who have since been promoted to more senior positions</li>
                        </ul>
                    </div>
                `
            },
            'exp2': {
                title: 'Frontend Developer at Amazon',
                summary: `
                    <div class="experience-summary">
                        <p><strong>Company:</strong> Amazon</p>
                        <p><strong>Duration:</strong> 2018 - 2020</p>
                        <p><strong>Location:</strong> Seattle, WA</p>
                        <p><strong>Team:</strong> Amazon Prime Video</p>
                        
                        <h3>Role Overview</h3>
                        <p>As a Frontend Developer for Amazon Prime Video, I was responsible for implementing user interfaces and interactive features for the streaming platform across web and smart TV applications. I collaborated closely with UX designers, backend engineers, and product managers to deliver seamless viewing experiences to millions of users worldwide.</p>
                        
                        <h3>Key Responsibilities</h3>
                        <ul>
                            <li>Develop responsive and accessible user interfaces</li>
                            <li>Implement new features using React and TypeScript</li>
                            <li>Optimize application performance and loading times</li>
                            <li>Conduct A/B testing for new features</li>
                            <li>Ensure cross-browser and cross-device compatibility</li>
                            <li>Write unit and integration tests</li>
                        </ul>
                        
                        <h3>Technologies</h3>
                        <p>React, TypeScript, Redux, Jest, Webpack, GraphQL, AWS, CI/CD</p>
                    </div>
                `,
                projects: `
                    <div class="project-list">
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Video Player Enhancement</h4>
                                <p>Rebuilt video player with improved playback controls and accessibility</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj5">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Recommendation Engine UI</h4>
                                <p>Designed and implemented user interface for personalized content recommendations</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj6">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Smart TV Application</h4>
                                <p>Led development of Prime Video app for Samsung Smart TVs</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj7">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Performance Optimization</h4>
                                <p>Reduced initial load time by 35% through code splitting and lazy loading</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj8">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                    </div>
                `,
                achievements: `
                    <div class="achievement-list-container">
                        <ul class="achievement-list">
                            <li class="achievement-item">Reduced application load time by 35% through implementing code splitting and lazy loading techniques</li>
                            <li class="achievement-item">Improved accessibility scores from 72 to 96, ensuring compliance with WCAG 2.1 AA standards</li>
                            <li class="achievement-item">Successfully led the development of Prime Video application for Samsung Smart TVs, reaching 10 million new users</li>
                            <li class="achievement-item">Implemented a component library that reduced development time for new features by 40%</li>
                            <li class="achievement-item">Received Amazon's "Just Do It" award for initiative in implementing automated visual regression testing</li>
                        </ul>
                    </div>
                `
            },
            'exp3': {
                title: 'Full Stack Developer at Microsoft',
                summary: `
                    <div class="experience-summary">
                        <p><strong>Company:</strong> Microsoft</p>
                        <p><strong>Duration:</strong> 2016 - 2018</p>
                        <p><strong>Location:</strong> Redmond, WA</p>
                        <p><strong>Team:</strong> Microsoft Teams</p>
                        
                        <h3>Role Overview</h3>
                        <p>As a Full Stack Developer on the Microsoft Teams project, I contributed to building and scaling the collaboration platform during its critical growth phase. I worked across the entire technology stack, developing both frontend interfaces and backend services to enable real-time communication and collaboration features.</p>
                        
                        <h3>Key Responsibilities</h3>
                        <ul>
                            <li>Develop and maintain frontend components using React</li>
                            <li>Design and implement RESTful APIs and microservices</li>
                            <li>Optimize database queries and data structures</li>
                            <li>Implement real-time communication features using WebSockets</li>
                            <li>Collaborate with UX designers to create intuitive user experiences</li>
                            <li>Participate in agile development processes</li>
                        </ul>
                        
                        <h3>Technologies</h3>
                        <p>React, C#, .NET Core, SQL Server, Azure, Redis, SignalR, TypeScript</p>
                    </div>
                `,
                projects: `
                    <div class="project-list">
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Chat System Redesign</h4>
                                <p>Implemented real-time messaging with offline support</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj9">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>File Sharing Feature</h4>
                                <p>Developed secure file sharing with version control</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj10">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Meeting Scheduler</h4>
                                <p>Created intuitive interface for scheduling and managing meetings</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj11">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Authentication System</h4>
                                <p>Implemented single sign-on and multi-factor authentication</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj12">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                    </div>
                `,
                achievements: `
                    <div class="achievement-list-container">
                        <ul class="achievement-list">
                            <li class="achievement-item">Rebuilt the chat system with enhanced reliability, reducing message delivery failures by 95%</li>
                            <li class="achievement-item">Designed and implemented a file sharing system that handled over 5 million file transfers daily</li>
                            <li class="achievement-item">Optimized database queries, resulting in a 60% reduction in response time for high-traffic endpoints</li>
                            <li class="achievement-item">Contributed to the successful launch of Microsoft Teams, which grew to 13 million daily active users during my tenure</li>
                            <li class="achievement-item">Awarded Microsoft's "Impact Award" for contributions to the Teams platform</li>
                        </ul>
                    </div>
                `
            },
            'exp4': {
                title: 'Mobile App Developer at Apple',
                summary: `
                    <div class="experience-summary">
                        <p><strong>Company:</strong> Apple</p>
                        <p><strong>Duration:</strong> 2014 - 2016</p>
                        <p><strong>Location:</strong> Cupertino, CA</p>
                        <p><strong>Team:</strong> iOS Applications</p>
                        
                        <h3>Role Overview</h3>
                        <p>As a Mobile App Developer at Apple, I specialized in building and enhancing native iOS applications. I worked on improving the user experience of core Apple apps and contributed to the development of new features that were released to millions of users worldwide.</p>
                        
                        <h3>Key Responsibilities</h3>
                        <ul>
                            <li>Develop native iOS applications using Swift and Objective-C</li>
                            <li>Collaborate with designers to implement pixel-perfect UIs</li>
                            <li>Optimize application performance on various iOS devices</li>
                            <li>Implement data synchronization between devices using iCloud</li>
                            <li>Write unit and UI automation tests</li>
                            <li>Fix bugs and improve existing features</li>
                        </ul>
                        
                        <h3>Technologies</h3>
                        <p>Swift, Objective-C, Xcode, Core Data, UIKit, Core Animation, XCTest</p>
                    </div>
                `,
                projects: `
                    <div class="project-list">
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Notes App Redesign</h4>
                                <p>Implemented new UI and enhanced synchronization capabilities</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj13">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Health Data Visualization</h4>
                                <p>Created interactive charts for the Health app</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj14">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>iCloud Integration</h4>
                                <p>Enhanced data synchronization across multiple devices</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj15">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Accessibility Features</h4>
                                <p>Improved app accessibility for users with disabilities</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj16">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                    </div>
                `,
                achievements: `
                    <div class="achievement-list-container">
                        <ul class="achievement-list">
                            <li class="achievement-item">Led the redesign of the Notes app, which received positive user feedback and a 4.8/5 rating on the App Store</li>
                            <li class="achievement-item">Developed innovative data visualization features for the Health app, allowing users to better understand their health trends</li>
                            <li class="achievement-item">Improved iCloud synchronization performance, reducing sync time by 70% and resolving conflict issues</li>
                            <li class="achievement-item">Enhanced accessibility features, making apps more usable for people with visual and motor impairments</li>
                            <li class="achievement-item">Contributed to the development of iOS 9 and iOS 10 features</li>
                        </ul>
                    </div>
                `
            },
            'exp5': {
                title: 'UI/UX Designer at Adobe',
                summary: `
                    <div class="experience-summary">
                        <p><strong>Company:</strong> Adobe</p>
                        <p><strong>Duration:</strong> 2012 - 2014</p>
                        <p><strong>Location:</strong> San Jose, CA</p>
                        <p><strong>Team:</strong> Creative Cloud Applications</p>
                        
                        <h3>Role Overview</h3>
                        <p>As a UI/UX Designer at Adobe, I focused on creating intuitive and visually appealing user interfaces for Creative Cloud applications. I worked closely with product managers, developers, and other designers to ensure a consistent and enjoyable user experience across Adobe's product suite.</p>
                        
                        <h3>Key Responsibilities</h3>
                        <ul>
                            <li>Create wireframes, mockups, and interactive prototypes</li>
                            <li>Conduct user research and usability testing</li>
                            <li>Develop design systems and component libraries</li>
                            <li>Collaborate with developers to ensure accurate implementation</li>
                            <li>Create visual assets and icons</li>
                            <li>Document design patterns and guidelines</li>
                        </ul>
                        
                        <h3>Tools & Skills</h3>
                        <p>Adobe XD, Photoshop, Illustrator, InDesign, Sketch, HTML/CSS, JavaScript, User Research</p>
                    </div>
                `,
                projects: `
                    <div class="project-list">
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Creative Cloud Desktop App</h4>
                                <p>Redesigned the application manager interface</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj17">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Photoshop Tool Redesign</h4>
                                <p>Enhanced usability of selection and masking tools</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj18">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Design System Development</h4>
                                <p>Created a unified design system for Creative Cloud apps</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj19">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                        <div class="project-item">
                            <div class="project-info">
                                <h4>Mobile App Prototypes</h4>
                                <p>Designed early prototypes for mobile Creative Cloud apps</p>
                            </div>
                            <button class="view-btn project-details-btn" data-id="proj20">
                                <i class="fas fa-eye"></i> Details
                            </button>
                        </div>
                    </div>
                `,
                achievements: `
                    <div class="achievement-list-container">
                        <ul class="achievement-list">
                            <li class="achievement-item">Redesigned the Creative Cloud desktop application, improving user satisfaction scores by 35%</li>
                            <li class="achievement-item">Developed a comprehensive design system that reduced inconsistencies across products and accelerated UI development</li>
                            <li class="achievement-item">Led usability testing sessions that identified and resolved key pain points in the user experience</li>
                            <li class="achievement-item">Created innovative interaction patterns for touch devices that were later adopted across multiple Adobe products</li>
                            <li class="achievement-item">Recognized with Adobe's Design Excellence Award for contributions to the Creative Cloud ecosystem</li>
                        </ul>
                    </div>
                `
            }
        };
        
        return experienceData[id] || {
            title: 'Experience Details',
            summary: '<p>No summary available for this experience.</p>',
            projects: '<p>No projects available for this experience.</p>',
            achievements: '<p>No achievements available for this experience.</p>'
        };
    }

    function getProjectData(id) {
        const projectData = {
            'proj1': {
                title: 'Container Orchestration Service',
                content: `
                    <div class="project-details">
                        <p><strong>Duration:</strong> 8 months</p>
                        <p><strong>Team Size:</strong> 6 engineers</p>
                        <p><strong>Role:</strong> Lead Developer</p>
                        
                        <h3>Project Overview</h3>
                        <p>Redesigned the scheduling algorithm for Google's container orchestration service to improve resource utilization and reduce costs. The project involved analyzing performance bottlenecks, developing a new scheduling approach, and implementing it with minimal disruption to running workloads.</p>
                        
                        <h3>Technical Challenges</h3>
                        <ul>
                            <li>Balancing resource efficiency with workload performance requirements</li>
                            <li>Ensuring backward compatibility with existing deployment configurations</li>
                            <li>Implementing rolling updates to minimize service disruption</li>
                            <li>Developing comprehensive metrics to measure improvements</li>
                        </ul>
                        
                        <h3>Technologies Used</h3>
                        <p>Go, Kubernetes, Prometheus, gRPC, Protobuf, BigQuery</p>
                        
                        <h3>Results</h3>
                        <ul>
                            <li>Reduced average CPU idle time by 42%</li>
                            <li>Improved memory utilization by 38%</li>
                            <li>Decreased cold start latency by 27%</li>
                            <li>Saved approximately $3.5M annually in infrastructure costs</li>
                        </ul>
                    </div>
                `
            },
            'proj2': {
                title: 'Monitoring System Overhaul',
                content: `
                    <div class="project-details">
                        <p><strong>Duration:</strong> 6 months</p>
                        <p><strong>Team Size:</strong> 4 engineers</p>
                        <p><strong>Role:</strong> Technical Lead</p>
                        
                        <h3>Project Overview</h3>
                        <p>Led the redesign of Google Cloud Platform's monitoring and alerting system to provide real-time insights into service health and performance. The new system enabled faster incident detection and resolution through improved metrics collection, intelligent anomaly detection, and contextual alerts.</p>
                        
                        <h3>Technical Challenges</h3>
                        <ul>
                            <li>Scaling metrics collection to handle millions of data points per second</li>
                            <li>Implementing machine learning-based anomaly detection</li>
                            <li>Designing a flexible alerting system with reduced false positives</li>
                            <li>Migrating from the legacy monitoring system without data loss</li>
                        </ul>
                        
                        <h3>Technologies Used</h3>
                        <p>Prometheus, Grafana, TensorFlow, Python, Go, Cloud Pub/Sub, BigQuery</p>
                        
                        <h3>Results</h3>
                        <ul>
                            <li>Reduced mean time to detection (MTTD) of incidents by 60%</li>
                            <li>Decreased false positive alerts by 75%</li>
                            <li>Improved system visibility with 3x more metrics collected</li>
                            <li>Enhanced historical data analysis for capacity planning</li>
                        </ul>
                    </div>
                `
            },
            'proj5': {
                title: 'Video Player Enhancement',
                content: `
                    <div class="project-details">
                        <p><strong>Duration:</strong> 5 months</p>
                        <p><strong>Team Size:</strong> 3 engineers</p>
                        <p><strong>Role:</strong> Frontend Developer</p>
                        
                        <h3>Project Overview</h3>
                        <p>Rebuilt Amazon Prime Video's web-based video player with improved playback controls, accessibility features, and performance optimizations. The project focused on creating a more intuitive and responsive viewing experience across different devices and network conditions.</p>
                        
                        <h3>Technical Challenges</h3>
                        <ul>
                            <li>Implementing adaptive streaming with seamless quality transitions</li>
                            <li>Ensuring cross-browser compatibility with modern video features</li>
                            <li>Developing advanced subtitle and caption support</li>
                            <li>Optimizing player for various device capabilities and screen sizes</li>
                        </ul>
                        
                        <h3>Technologies Used</h3>
                        <p>React, TypeScript, HTML5 Media APIs, HLS.js, DASH.js, Jest, Enzyme</p>
                        
                        <h3>Results</h3>
                        <ul>
                            <li>Reduced video start time by 40% on average</li>
                            <li>Improved accessibility score from 68 to 97</li>
                            <li>Decreased rebuffering events by 35%</li>
                            <li>Increased viewer engagement with 15% longer average session duration</li>
                        </ul>
                    </div>
                `
            }
        };
        
        // Add more project data as needed
        
        return projectData[id] || {
            title: 'Project Details',
            content: '<p>No details available for this project.</p>'
        };
    }
});
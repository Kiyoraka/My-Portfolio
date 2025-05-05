// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Import education, experience and project modules
    import('./education.js')
        .then(module => {
            window.getEducationData = module.getEducationData;
            module.initializeEducation();
        })
        .catch(error => console.error('Error loading education module:', error));
        
    import('./experience.js')
        .then(module => {
            window.getExperienceData = module.getExperienceData;
            module.initializeExperience();
        })
        .catch(error => console.error('Error loading experience module:', error));
        
    import('./projects.js')
        .then(module => {
            window.getProjectData = module.getProjectData;
        })
        .catch(error => console.error('Error loading projects module:', error));
        
    // Navigation Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Modal Elements
    const coverLetterBtn = document.getElementById('cover-letter-btn');
    const coverLetterModal = document.getElementById('cover-letter-modal');
    const experienceModal = document.getElementById('experience-modal');
    const projectModal = document.getElementById('project-modal');
    const settingsModal = document.getElementById('settings-modal');
    const closeButtons = document.querySelectorAll('.close');
    
    // Modal Content Elements
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
            const projectData = window.getProjectData(id);
            
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
});
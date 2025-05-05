/**
 * Experience section management
 * Handles loading and displaying work experience data from modules
 */

// Import experience modules
import GoogleExperience from './experience/Google.js';
import AmazonExperience from './experience/Amazon.js';

// Experience data collection - add all experience modules here
const experienceModules = [
    GoogleExperience,
    AmazonExperience
    // Add more experience modules as needed
];

/**
 * Get experience data by ID
 * @param {string} id - Experience ID
 * @returns {Object} Experience data object with title, summary, projects, and achievements
 */
export function getExperienceData(id) {
    // Find the module with this ID
    const module = experienceModules.find(m => m.id === id);
    
    if (module) {
        return {
            title: module.title,
            summary: module.getSummaryContent(),
            projects: module.getProjectsContent(),
            achievements: module.getAchievementsContent()
        };
    }
    
    // If no module found, return default message
    return {
        title: 'Experience Details',
        summary: '<p>No summary available for this experience.</p>',
        projects: '<p>No projects available for this experience.</p>',
        achievements: '<p>No achievements available for this experience.</p>'
    };
}

/**
 * Initialize the experience section
 * Loads all experience cards from modules
 */
export function initializeExperience() {
    const experienceContainer = document.querySelector('.experience-container');
    
    if (experienceContainer) {
        // Clear existing experience cards
        experienceContainer.innerHTML = '';
        
        // Add experience cards from modules
        experienceModules.forEach(module => {
            const cardData = module.getCardData();
            
            // Create the card element
            const card = document.createElement('div');
            card.className = 'experience-card';
            
            card.innerHTML = `
                <div class="experience-card-content">
                    <h3 class="experience-title">${cardData.title}</h3>
                    <p class="experience-company">${cardData.company}</p>
                    <div class="experience-date">${cardData.duration}</div>
                </div>
                <div class="experience-actions">
                    <button class="view-btn" data-id="${module.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            `;
            
            // Add to container
            experienceContainer.appendChild(card);
            
            // Add event listener to the button
            card.querySelector('.view-btn').addEventListener('click', function() {
                const experienceModal = document.getElementById('experience-modal');
                const experienceModalTitle = document.getElementById('experience-modal-title');
                
                const data = getExperienceData(this.getAttribute('data-id'));
                experienceModalTitle.textContent = data.title;
                
                // Populate tab content
                document.getElementById('summary').innerHTML = data.summary;
                document.getElementById('projects').innerHTML = data.projects;
                document.getElementById('achievements').innerHTML = data.achievements;
                
                // Reset tabs to show summary first
                const tabButtons = document.querySelectorAll('.tab-btn');
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.querySelector('[data-tab="summary"]').classList.add('active');
                document.getElementById('summary').classList.add('active');
                
                // Open modal
                experienceModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }
}

// Export default experience data getter for compatibility with existing code
export default getExperienceData;
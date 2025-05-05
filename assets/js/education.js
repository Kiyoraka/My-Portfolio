/**
 * Education section management
 * Handles loading and displaying education data from modules
 */

// Import education modules
import HNDCSDEducation from '../education/HNDCSD.js';
import ScrumMasterEducation from '../education/ScrumMaster.js';
import ReactReduxEducation from '../education/ReactRedux.js';

// Education data collection - add all education modules here
const educationModules = [
    HNDCSDEducation,
    ScrumMasterEducation,
    ReactReduxEducation
    // Add more education modules as needed
];

/**
 * Get education data by ID
 * @param {string} id - Education ID
 * @returns {Object} Education data object
 */
export function getEducationData(id) {
    // Find the module with this ID
    const module = educationModules.find(m => m.id === id);
    
    if (module) {
        return {
            title: module.title,
            content: module.getDetailedContent()
        };
    }
    
    // If no module found, return default message
    return { 
        title: 'Education Details',
        content: '<p>No details available for this education.</p>'
    };
}

/**
 * Initialize the education section
 * Loads all education cards from modules
 */
export function initializeEducation() {
    const educationContainer = document.querySelector('.education-container');
    
    if (educationContainer) {
        // Clear existing education cards
        educationContainer.innerHTML = '';
        
        // Add education cards from modules
        educationModules.forEach(module => {
            const cardData = module.getCardData();
            
            // Create the card element
            const card = document.createElement('div');
            card.className = cardData.isCertificate ? 
                'education-card certificate-card' : 
                'education-card';
            
            card.innerHTML = `
                <div class="education-card-content">
                    <h3 class="education-title">${cardData.title}</h3>
                    <p class="education-institution">${cardData.institution}</p>
                    <div class="education-date">${cardData.duration}</div>
                </div>
                <div class="education-actions">
                    <button class="view-btn" data-id="${module.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            `;
            
            // Add to container
            educationContainer.appendChild(card);
            
            // Add event listener to the button
            card.querySelector('.view-btn').addEventListener('click', function() {
                const educationModal = document.getElementById('education-modal');
                const educationModalTitle = document.getElementById('education-modal-title');
                const educationModalContent = document.getElementById('education-modal-content');
                
                const data = getEducationData(this.getAttribute('data-id'));
                educationModalTitle.textContent = data.title;
                educationModalContent.innerHTML = data.content;
                
                // Open modal
                educationModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }
}

// Export default education data getter for compatibility with existing code
export default getEducationData;
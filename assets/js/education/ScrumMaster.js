/**
 * Professional Scrum Master
 * Education details module
 */

const ScrumMasterEducation = {
    id: "scrum-master",
    title: "Professional Scrum Master",
    institution: "Scrum.org",
    duration: "2020",
    credentialId: "PSM-123456",
    isCertificate: true,
    
    // Return formatted HTML content for modal display
    getDetailedContent: function() {
        return `
            <div class="education-details">
                <p><strong>Institution:</strong> ${this.institution}</p>
                <p><strong>Date:</strong> ${this.duration}</p>
                <p><strong>Credential ID:</strong> ${this.credentialId}</p>
                
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
        `;
    },
    
    // Return card data for education list
    getCardData: function() {
        return {
            title: this.title,
            institution: this.institution,
            duration: this.duration,
            isCertificate: this.isCertificate
        };
    }
};

// Export the module
export default ScrumMasterEducation;
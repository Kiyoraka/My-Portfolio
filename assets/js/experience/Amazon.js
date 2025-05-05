/**
 * Frontend Developer at Amazon
 * Experience details module
 */

const AmazonExperience = {
    id: "amazon-frontend",
    title: "Frontend Developer at Amazon",
    company: "Amazon",
    duration: "2018 - 2020",
    location: "Seattle, WA",
    team: "Amazon Prime Video",
    
    // Return formatted HTML content for summary tab
    getSummaryContent: function() {
        return `
            <div class="experience-summary">
                <p><strong>Company:</strong> ${this.company}</p>
                <p><strong>Duration:</strong> ${this.duration}</p>
                <p><strong>Location:</strong> ${this.location}</p>
                <p><strong>Team:</strong> ${this.team}</p>
                
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
        `;
    },
    
    // Return formatted HTML content for projects tab
    getProjectsContent: function() {
        return `
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
        `;
    },
    
    // Return formatted HTML content for achievements tab
    getAchievementsContent: function() {
        return `
            <div class="achievement-list-container">
                <ul class="achievement-list">
                    <li class="achievement-item">Reduced application load time by 35% through implementing code splitting and lazy loading techniques</li>
                    <li class="achievement-item">Improved accessibility scores from 72 to 96, ensuring compliance with WCAG 2.1 AA standards</li>
                    <li class="achievement-item">Successfully led the development of Prime Video application for Samsung Smart TVs, reaching 10 million new users</li>
                    <li class="achievement-item">Implemented a component library that reduced development time for new features by 40%</li>
                    <li class="achievement-item">Received Amazon's "Just Do It" award for initiative in implementing automated visual regression testing</li>
                </ul>
            </div>
        `;
    },
    
    // Return card data for experience list
    getCardData: function() {
        return {
            title: this.title,
            company: this.company,
            duration: this.duration
        };
    }
};

// Export the module
export default AmazonExperience;
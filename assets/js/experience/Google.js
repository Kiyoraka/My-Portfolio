/**
 * Senior Software Engineer at Google
 * Experience details module
 */

const GoogleExperience = {
    id: "google-engineer",
    title: "Senior Software Engineer at Google",
    company: "Google",
    duration: "2020 - Present",
    location: "Mountain View, CA",
    team: "Google Cloud Platform",
    
    // Return formatted HTML content for summary tab
    getSummaryContent: function() {
        return `
            <div class="experience-summary">
                <p><strong>Company:</strong> ${this.company}</p>
                <p><strong>Duration:</strong> ${this.duration}</p>
                <p><strong>Location:</strong> ${this.location}</p>
                <p><strong>Team:</strong> ${this.team}</p>
                
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
        `;
    },
    
    // Return formatted HTML content for projects tab
    getProjectsContent: function() {
        return `
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
        `;
    },
    
    // Return formatted HTML content for achievements tab
    getAchievementsContent: function() {
        return `
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
export default GoogleExperience;
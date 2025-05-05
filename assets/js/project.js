/**
 * Project data management
 * Handles loading and displaying project data
 */

// Project data collection - this could be expanded with separate modules like education/experience
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
    // Add more project data as needed
};

/**
 * Get project data by ID
 * @param {string} id - Project ID
 * @returns {Object} Project data object with title and content
 */
export function getProjectData(id) {
    return projectData[id] || {
        title: 'Project Details',
        content: '<p>No details available for this project.</p>'
    };
}

// Export default project data getter for compatibility with existing code
export default getProjectData;
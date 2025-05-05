/**
 * Advanced React & Redux
 * Education details module
 */

const ReactReduxEducation = {
    id: "react-redux",
    title: "Advanced React & Redux",
    institution: "Udemy",
    duration: "2019",
    instructor: "Stephen Grider",
    credentialId: "UC-123456",
    isCertificate: true,
    
    // Return formatted HTML content for modal display
    getDetailedContent: function() {
        return `
            <div class="education-details">
                <p><strong>Institution:</strong> ${this.institution}</p>
                <p><strong>Date:</strong> ${this.duration}</p>
                <p><strong>Instructor:</strong> ${this.instructor}</p>
                <p><strong>Certificate ID:</strong> ${this.credentialId}</p>
                
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
export default ReactReduxEducation;
/**
 * Higher National Diploma in Computer Software Development
 * Education details module
 */

const HNDCSDEducation = {
    id: "hndcsd",
    title: "Higher National Diploma in Computer Software Development",
    institution: "Kolej Profesional Mara Beranang",
    duration: "2011-2015",
    gpa: "3.25/4.0",
    focus: "Computer Software Development",
    
    // Return formatted HTML content for modal display
    getDetailedContent: function() {
        return `
            <div class="education-details">
                <p><strong>Institution:</strong> ${this.institution}</p>
                <p><strong>Duration:</strong> ${this.duration}</p>
                <p><strong>GPA:</strong> ${this.gpa}</p>
                <p><strong>Area of Focus:</strong> ${this.focus}</p>
                
                <h3>Key Courses</h3>
                <ul>
                    <li>Computer Platforms</li>
                    <li>Systems Analysis</li>
                    <li>Programming Concepts</li>
                    <li>Database Design Concepts</li>
                    <li>Networking Concepts</li>
                    <li>Visual Programming</li>
                    <li>Software Development Project</li>
                    <li>MS Office Solution Development</li>
                    <li>Website Design</li>
                    <li>Project Management</li>
                    <li>Java Programming</li>
                    <li>Visual Programming Development</li>
                    <li>Software Testing</li>
                    <li>Data Structure And Algorithms</li>
                    <li>Quality Systems</li>
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
        `;
    },
    
    // Return card data for education list
    getCardData: function() {
        return {
            title: this.title,
            institution: this.institution,
            duration: this.duration,
            isCertificate: false
        };
    }
};

// Export the module
export default HNDCSDEducation;
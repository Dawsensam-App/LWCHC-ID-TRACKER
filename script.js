document.addEventListener("DOMContentLoaded", function() {
    const studentForm = document.getElementById('studentForm');
    const output = document.getElementById('output');
    const generateReportButton = document.getElementById('generateReport');

    // Load student data from localStorage or initialize a new object
    let studentData = JSON.parse(localStorage.getItem('studentData')) || {};

    studentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const studentId = document.getElementById('studentId').value.trim();
        const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

        if (studentId) {
            if (!studentData[studentId]) {
                studentData[studentId] = [];
            }
            studentData[studentId].push(today);
            localStorage.setItem('studentData', JSON.stringify(studentData));
            displayCount(studentId);
        }
    });

    function displayCount(studentId) {
        const count = studentData[studentId] ? studentData[studentId].length : 0;
        output.innerHTML = `Student ID ${studentId} has been entered ${count} times in the last 365 days.`;
    }

    generateReportButton.addEventListener('click', function() {
        // Generate the report and send it via email
        generateReport();
    });

    function generateReport() {
        const reportData = JSON.stringify(studentData, null, 2);

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'dawsensam@gmail.com',
                subject: 'Student ID Report',
                message: reportData
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Report sent successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

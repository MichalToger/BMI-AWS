const API_BASE_URL = "https://p8j9kem4pj.execute-api.us-east-1.amazonaws.com/production";
const COGNITO_URL = "https://bmi-login.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=6drqnkmsb5r45492kg3mm034m8&redirect_uri=https://bmi-website-storage.s3-website-us-east-1.amazonaws.com";

function fetchAllRecords() {
    fetch(API_BASE_URL + '/fetchallrecords')
    .then(response => response.json())
    .then(data => {
        // Process and display the data on your page
        // For example, populate the 'bmi-table' with the fetched records
    })
    .catch(error => {
        console.error('Error fetching BMI records:', error);
    });
}

function addRecord() {
    // Add a new BMI record
    // This will be implemented after user login is set up
}

function updateRecord(timestamp) {
    // Update an existing BMI record
    // This will be implemented after user login is set up
}

function deleteRecord(timestamp) {
    // Delete a BMI record
    // This will be implemented after user login is set up
}

// Check if the user is logged in (based on the presence of a code in the URL)
if (window.location.search.includes("code=")) {
    // The user has logged in via Cognito
    document.getElementById("bmi-section").style.display = "block";
    fetchAllRecords();
} else {
    // Redirect to Cognito Hosted UI for login/registration
    window.location.href = COGNITO_URL;
}

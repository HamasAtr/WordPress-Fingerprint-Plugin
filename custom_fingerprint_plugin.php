<?php
// Establish database connection
$servername = "YOUR_SERVER_NAME";
$username = "YOUR_USERNAME";
$password = "YOUR_PASSWORD";
$dbname = "YOUR_DATABASE_NAME";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the data sent from JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Extract the values
$canvas = $data['canvas'];
$webGL = $data['webGL'];
$device = $data['device'];
$browser = $data['browser'];
$country = $data['country'];
$timezone = $data['timezone'];

// Prepare and execute the SQL statement
$stmt = $conn->prepare("INSERT INTO fingerprints_of_user (canvas, webgl, device, browser, country, timezone) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $canvas, $webGL, $device, $browser, $country, $timezone);
$stmt->execute();

// Check if the insertion was successful
if ($stmt->affected_rows > 0) {
    echo "Data inserted successfully!";
} else {
    echo "Failed to insert data: " . $conn->error;
}

// Close the database connection
$stmt->close();
$conn->close();
?>

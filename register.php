<?php
header('Content-Type: application/json');
require 'config.php';

$response = ['success' => false, 'message' => ''];

try {
    // Get input data
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $confirmPassword = $data['confirmPassword'] ?? '';

    // Validate input
    if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
        throw new Exception('All fields are required');
    }

    if ($password !== $confirmPassword) {
        throw new Exception('Passwords do not match');
    }

    if (strlen($password) < 8) {
        throw new Exception('Password must be at least 8 characters');
    }

    // Check if username or email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = :username OR email = :email");
    $stmt->execute([':username' => $username, ':email' => $email]);
    
    if ($stmt->rowCount() > 0) {
        throw new Exception('Username or email already exists');
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $stmt->execute([
        ':username' => $username,
        ':email' => $email,
        ':password' => $hashedPassword
    ]);

    $response['success'] = true;
    $response['message'] = 'Registration successful';
} catch(Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>
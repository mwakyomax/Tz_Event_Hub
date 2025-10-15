<?php
header('Content-Type: application/json');
require 'config.php';

$response = ['success' => false, 'message' => ''];

try {
    // Get input data
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    // Validate input
    if (empty($username) || empty($password)) {
        throw new Exception('Username and password are required');
    }

    // Find user by username or email
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username OR email = :username");
    $stmt->execute([':username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        throw new Exception('Invalid username or password');
    }

    // Verify password
    if (!password_verify($password, $user['password'])) {
        throw new Exception('Invalid username or password');
    }

    // Start session (in a real app, you might use JWT instead)
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];

    $response['success'] = true;
    $response['message'] = 'Login successful';
    $response['user'] = [
        'id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email']
    ];
} catch(Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>
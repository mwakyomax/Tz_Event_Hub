<?php
header('Content-Type: application/json');
require 'config.php';

try {
    // Get search parameters from request
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $location = isset($_GET['location']) ? $_GET['location'] : '';
    $category = isset($_GET['category']) ? $_GET['category'] : '';

    // Build SQL query with filters
    $sql = "SELECT * FROM events WHERE 1=1";
    $params = [];

    if (!empty($search)) {
        $sql .= " AND (title LIKE :search OR description LIKE :search)";
        $params[':search'] = "%$search%";
    }

    if (!empty($location)) {
        $sql .= " AND location = :location";
        $params[':location'] = $location;
    }

    if (!empty($category)) {
        $sql .= " AND category = :category";
        $params[':category'] = $category;
    }

    $sql .= " ORDER BY event_date ASC, event_time ASC";

    // Prepare and execute the query
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);

    // Fetch all events
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return events as JSON
    echo json_encode($events);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
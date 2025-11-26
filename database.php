<?php
$host = 'localhost';
$port = 3308;           // Cambia a 3307 si 
$db   = 'sistecread';
$user = 'root';
$pass = '';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die(json_encode(['error' => 'DB: ' . $e->getMessage()]));
}
?>
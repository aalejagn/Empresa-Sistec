<?php
// conexion.php  ← guárdalo con este nombre

header('Content-Type: application/json; charset=utf-8');

// Detecta si estás en local (XAMPP) o en producción (AwardSpace)
if (
    isset($_SERVER['HTTP_HOST']) && 
    ($_SERVER['HTTP_HOST'] == 'localhost' || 
     strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false || 
     strpos($_SERVER['HTTP_HOST'], '192.168.') !== false)
    || isset($_SERVER['SERVER_ADDR']) && 
    ($_SERVER['SERVER_ADDR'] == '127.0.0.1' || $_SERVER['SERVER_ADDR'] == '::1')
) {
    // CONFIGURACIÓN LOCAL → XAMPP (tu computadora)
    $host = '127.0.0.1';
    $port = 3308;                    // ← TU PUERTO CORRECTO
    $dbname = '4711571_sistecread';         // ← nombre de tu base de datos local
    $username = 'root';
    $password = '';                  // ← sin contraseña, como tienes ahora
} else {
    // CONFIGURACIÓN PRODUCCIÓN → AwardSpace
    $host = '';
    $port = 3306;
    $dbname = '4711571_sistecread';
    $username = '4711571_sistecread';
    $password = 'pb[)p;(]5Yey}53X';  // ← contraseña real del hosting
}

$dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    // ¡Conexión exitosa!
    // echo json_encode(['status' => 'success', 'message' => 'Conectado a MySQL']);
} catch (PDOException $e) {
    // Error claro para que sepas qué pasó
    http_response_code(500);
    die(json_encode([
        'error' => 'Conexión fallida',
        'message' => $e->getMessage(),
        'host' => $host,
        'port' => $port,
        'db' => $dbname
    ]));
}
?>
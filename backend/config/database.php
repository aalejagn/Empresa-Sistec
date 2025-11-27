<?php

// Detecta automáticamente si estás en local o en AwardSpace
if ($_SERVER['HTTP_HOST'] == 'localhost' || $_SERVER['SERVER_ADDR'] == '127.0.0.1' || $_SERVER['SERVER_ADDR'] == '::1') {
    // ====== CONFIGURACIÓN LOCAL (tu PC) ======
    $host = 'localhost';
    $port = 3308;                    // o 3306, el que uses tú
    $db   = 'sistecread';
    $user = 'root';
    $pass = '';
} else {
    // ====== CONFIGURACIÓN AWARDSPACE (servidor real) ======
    $host = 'fdb1032.awardspace.net';
    $port = 3306;
    $db   = '4711571_sistecread';
    $user = '4711571_sistecread';
    $pass = 'pb[)p;(]5Yey}53X';  // ¡¡¡esta línea sí cámbiala!!!
}

$host = "hopper.proxy.rlwy.net";
$port = 43445;
$dbname = "railway";
$username = "root";
$password = "TU_PASSWORD_REAL"; // la de Railway

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    // opcional: para que veas que conectó
    // echo "Conectado a la base de datos";
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>

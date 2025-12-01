<?php
require dirname(__DIR__) . '/config/database.php';
require dirname(__DIR__) . '/includes/cors.php';
require __DIR__ . '/middleware/auth_required.php'; // ← REQUERIDO: solo logueados

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$nombre  = trim($data['nombre'] ?? '');
$email   = trim($data['email'] ?? '');
$asunto  = trim($data['asunto'] ?? '');
$mensaje = trim($data['mensaje'] ?? '');

if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje)) {
    echo json_encode(['error' => 'Todos los campos son obligatorios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO contactos (usuario_id, nombre, email, asunto, mensaje, creado_en) VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->execute([$usuario_id, $nombre, $email, $asunto, $mensaje]);

    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Error al enviar mensaje']);
}
?>
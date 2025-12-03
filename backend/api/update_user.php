<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://empresa-sistec-t5fv.vercel.app');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

require dirname(__DIR__) . '/config/database.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true) ?: [];

$action = $data['action'] ?? '';
$userId = $data['user_id'] ?? 0;

if ($action !== 'update_user' || $userId <= 0) {
    echo json_encode(['error' => 'Acción o ID inválido']);
    exit;
}

// Campos permitidos para update
$updates = [];
$params = [];

if (isset($data['email'])) {
    $updates[] = 'email = ?';
    $params[] = trim($data['email']);
}

if (isset($data['telefono'])) {
    $updates[] = 'telefono = ?';
    $params[] = trim($data['telefono']);
}

if (isset($data['password'])) {
    if (strlen($data['password']) < 6) {
        echo json_encode(['error' => 'Contraseña demasiado corta']);
        exit;
    }
    $updates[] = 'password = ?';
    $params[] = password_hash($data['password'], PASSWORD_BCRYPT);
}

if (empty($updates)) {
    echo json_encode(['error' => 'No hay datos para actualizar']);
    exit;
}

// Actualizar
try {
    $sql = "UPDATE usuarios SET " . implode(', ', $updates) . " WHERE id = ?";
    $params[] = $userId;

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Devolver user actualizado
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
    $stmt->execute([$userId]);
    $updatedUser = $stmt->fetch();

    echo json_encode([
        'success' => true,
        'message' => 'Datos actualizados con éxito',
        'user' => $updatedUser
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Error al actualizar: ' . $e->getMessage()]);
}
exit;
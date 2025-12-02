<?php
// api/middleware/auth_required.php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Content-Type: application/json');
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error' => 'Debes iniciar sesión para realizar esta acción',
        'redirect' => 'https://empresa-sistec-t5fv.vercel.app/login'
    ]);
    exit;
}

// Opcional: devuelve el ID del usuario para usarlo después
$usuario_id = $_SESSION['user_id'];
?>
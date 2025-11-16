<?php
require '../config/database.php';
require '../includes/cors.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  $action = $data['action'] ?? null;

  if ($action === 'register') {
    $nombre = $data['nombre'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
    if ($stmt->execute([$nombre, $email, $password])) {
      echo json_encode(['success' => true]);
    } else {
      echo json_encode(['error' => 'Registro fallido']);
    }
  } elseif ($action === 'login') {
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
      echo json_encode(['success' => true, 'user' => $user]);
    } else {
      echo json_encode(['error' => 'Credenciales inválidas']);
    }
  }
}
?>
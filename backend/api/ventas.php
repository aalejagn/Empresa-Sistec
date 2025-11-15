<?php
require '../../config/database.php';
require '../../includes/cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  $items = $data['items'];
  $usuario_id = $data['usuario_id'] ?? null;  // De login

  $pdo->beginTransaction();

  try {
    $stmt = $pdo->prepare("INSERT INTO ventas (usuario_id, total) VALUES (?, ?)");
    $total = array_reduce($items, fn($sum, $item) => $sum + ($item['precio'] * $item['cantidad']), 0);
    $stmt->execute([$usuario_id, $total]);
    $venta_id = $pdo->lastInsertId();

    foreach ($items as $item) {
      $stmt = $pdo->prepare("INSERT INTO venta_detalles (venta_id, libro_id, cantidad, precio) VALUES (?, ?, ?, ?)");
      $stmt->execute([$venta_id, $item['id'], $item['cantidad'], $item['precio']]);

      $pdo->prepare("UPDATE libros SET stock = stock - ? WHERE id = ?")->execute([$item['cantidad'], $item['id']]);
    }

    $pdo->commit();
    echo json_encode(['success' => true]);
  } catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['error' => $e->getMessage()]);
  }
}
?>
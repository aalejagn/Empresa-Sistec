<?php
require dirname(__DIR__) . '/config/database.php';
require dirname(__DIR__) . '/includes/cors.php';
require __DIR__ . '/middleware/auth_required.php'; // ← Solo usuarios logueados

header('Content-Type: application/json');

try {
    $stmt = $pdo->prepare("
        SELECT v.*, 
               GROUP_CONCAT(
                   CONCAT('{',
                       '\"id\":', d.libro_id,
                       ',\"titulo\":\"', COALESCE(REPLACE(l.titulo, '\"', '\\\"'), 'Libro desconocido'), '\"',
                       ',\"precio\":', d.precio,
                       ',\"cantidad\":', d.cantidad,
                   '}')
               SEPARATOR ',') AS items
       
        
        FROM ventas v
        LEFT JOIN venta_detalles d ON v.id = d.venta_id
        LEFT JOIN libros l ON d.libro_id = l.id
        WHERE v.usuario_id = ?
        GROUP BY v.id
        ORDER BY v.creado_en DESC
    ");
    $stmt->execute([$usuario_id]);
    $ventas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertir el string de items a array real
    foreach ($ventas as &$venta) {
        $items_raw = $venta['items'] ?? '';
        $items = $items_raw ? json_decode('[' . $items_raw . ']', true) : [];
        $venta['items'] = $items;
    }

    echo json_encode([
        'success' => true,
        'ventas' => $ventas
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error al cargar historial'
    ]);
}
?>
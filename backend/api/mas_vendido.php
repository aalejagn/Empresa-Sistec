<?php
require dirname(__DIR__) . '/config/database.php';
require dirname(__DIR__) . '/includes/cors.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // 1. Primero intentamos obtener los 6 libros MÁS VENDIDOS reales
    $sql = "
        SELECT 
            l.id,
            l.titulo,
            l.autor,
            l.imagen,
            l.descripcion,
            l.publicado,
            l.editorial,
            l.encuadernacion,
            l.precio,
            l.categoria,
            l.creado_en,
            l.stock,
            SUM(vd.cantidad) AS total_vendido
        FROM venta_detalles vd
        INNER JOIN libros l ON vd.libro_id = l.id
        GROUP BY vd.libro_id
        ORDER BY total_vendido DESC
        LIMIT 6
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 2. Si no hay ventas todavía → fallback a la categoría 'mas-vendidos'
    if (empty($result)) {
        $sqlFallback = "SELECT * FROM libros WHERE categoria = 'mas-vendidos' LIMIT 6";
        $stmtFallback = $pdo->prepare($sqlFallback);
        $stmtFallback->execute();
        $result = $stmtFallback->fetchAll(PDO::FETCH_ASSOC);
    }

    // 3. Devolvemos siempre JSON (incluso si está vacío)
    echo json_encode($result);
    exit;
}
?>
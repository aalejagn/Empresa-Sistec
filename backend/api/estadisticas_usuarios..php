<?php
// estadisticas_usuario.php
require_once 'conexion.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Obtener el ID del usuario desde la query string
    $usuario_id = isset($_GET['usuario_id']) ? intval($_GET['usuario_id']) : null;
    
    if (!$usuario_id) {
        throw new Exception('ID de usuario requerido');
    }

    // 1. Información básica del usuario
    $stmt = $pdo->prepare("SELECT nombre, email, creado_en FROM usuarios WHERE id = ?");
    $stmt->execute([$usuario_id]);
    $usuario = $stmt->fetch();
    
    if (!$usuario) {
        throw new Exception('Usuario no encontrado');
    }

    // 2. Total de compras y dinero gastado
    $stmt = $pdo->prepare("
        SELECT 
            COUNT(*) as total_compras,
            COALESCE(SUM(total), 0) as total_gastado
        FROM ventas 
        WHERE usuario_id = ?
    ");
    $stmt->execute([$usuario_id]);
    $stats_compras = $stmt->fetch();

    // 3. Total de libros comprados
    $stmt = $pdo->prepare("
        SELECT COALESCE(SUM(vd.cantidad), 0) as total_libros
        FROM venta_detalles vd
        INNER JOIN ventas v ON vd.venta_id = v.id
        WHERE v.usuario_id = ?
    ");
    $stmt->execute([$usuario_id]);
    $stats_libros = $stmt->fetch();

    // 4. Compras por mes (últimos 6 meses)
    $stmt = $pdo->prepare("
        SELECT 
            DATE_FORMAT(creado_en, '%Y-%m') as mes,
            COUNT(*) as cantidad,
            SUM(total) as total
        FROM ventas 
        WHERE usuario_id = ? 
        AND creado_en >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(creado_en, '%Y-%m')
        ORDER BY mes ASC
    ");
    $stmt->execute([$usuario_id]);
    $compras_por_mes = $stmt->fetchAll();

    // 5. Categorías favoritas (más compradas)
    $stmt = $pdo->prepare("
        SELECT 
            l.categoria,
            COUNT(*) as cantidad,
            SUM(vd.cantidad) as total_libros
        FROM venta_detalles vd
        INNER JOIN ventas v ON vd.venta_id = v.id
        INNER JOIN libros l ON vd.libro_id = l.id
        WHERE v.usuario_id = ?
        GROUP BY l.categoria
        ORDER BY cantidad DESC
        LIMIT 5
    ");
    $stmt->execute([$usuario_id]);
    $categorias_favoritas = $stmt->fetchAll();

    // 6. Libro más caro comprado
    $stmt = $pdo->prepare("
        SELECT 
            l.titulo,
            vd.precio
        FROM venta_detalles vd
        INNER JOIN ventas v ON vd.venta_id = v.id
        INNER JOIN libros l ON vd.libro_id = l.id
        WHERE v.usuario_id = ?
        ORDER BY vd.precio DESC
        LIMIT 1
    ");
    $stmt->execute([$usuario_id]);
    $libro_mas_caro = $stmt->fetch();

    // 7. Primera compra
    $stmt = $pdo->prepare("
        SELECT creado_en, total
        FROM ventas 
        WHERE usuario_id = ?
        ORDER BY creado_en ASC
        LIMIT 1
    ");
    $stmt->execute([$usuario_id]);
    $primera_compra = $stmt->fetch();

    // 8. Última compra
    $stmt = $pdo->prepare("
        SELECT creado_en, total
        FROM ventas 
        WHERE usuario_id = ?
        ORDER BY creado_en DESC
        LIMIT 1
    ");
    $stmt->execute([$usuario_id]);
    $ultima_compra = $stmt->fetch();

    // 9. Calcular días como miembro
    $fecha_registro = new DateTime($usuario['creado_en']);
    $hoy = new DateTime();
    $dias_miembro = $fecha_registro->diff($hoy)->days;

    // 10. Libros más comprados
    $stmt = $pdo->prepare("
        SELECT 
            l.titulo,
            l.imagen,
            l.autor,
            SUM(vd.cantidad) as veces_comprado
        FROM venta_detalles vd
        INNER JOIN ventas v ON vd.venta_id = v.id
        INNER JOIN libros l ON vd.libro_id = l.id
        WHERE v.usuario_id = ?
        GROUP BY l.id
        ORDER BY veces_comprado DESC
        LIMIT 3
    ");
    $stmt->execute([$usuario_id]);
    $libros_favoritos = $stmt->fetchAll();

    // Construir respuesta
    $respuesta = [
        'success' => true,
        'usuario' => [
            'nombre' => $usuario['nombre'],
            'email' => $usuario['email'],
            'miembro_desde' => $usuario['creado_en'],
            'dias_como_miembro' => $dias_miembro
        ],
        'estadisticas' => [
            'total_compras' => (int)$stats_compras['total_compras'],
            'total_gastado' => (float)$stats_compras['total_gastado'],
            'total_libros' => (int)$stats_libros['total_libros'],
            'promedio_por_compra' => $stats_compras['total_compras'] > 0 
                ? round($stats_compras['total_gastado'] / $stats_compras['total_compras'], 2) 
                : 0
        ],
        'compras_por_mes' => $compras_por_mes,
        'categorias_favoritas' => $categorias_favoritas,
        'libro_mas_caro' => $libro_mas_caro,
        'primera_compra' => $primera_compra,
        'ultima_compra' => $ultima_compra,
        'libros_favoritos' => $libros_favoritos
    ];

    echo json_encode($respuesta, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
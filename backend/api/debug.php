<?php
header('Content-Type: text/plain');
$path = dirname(__DIR__) . "/api/email_bienvenida.html";
echo "Buscando: $path\n";
echo "Existe: " . (file_exists($path) ? "SÍ" : "NO") . "\n";
echo "Legible: " . (is_readable($path) ? "SÍ" : "NO") . "\n";
echo "Permisos: " . substr(sprintf('%o', fileperms($path)), -4) . "\n";
echo "Contenido (primeros 200 chars):\n";
echo file_exists($path) ? substr(file_get_contents($path), 0, 200) : "No se puede leer";
?>
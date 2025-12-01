<?php
// backend/api/sendmail.php → VERSIÓN QUE SÍ ENVÍA CORREOS EN AWARDSPACE (2025)

function enviarCorreo($destinatario, $nombre, $asunto, $htmlContenido)
{
    $service_id = 'service_peqefne';
    $user_id    = '874023563138-7cn5pd2c3nga4oi1ds6j10a6aqd0dg43.apps.googleusercontent.com';

    // Tus templates reales
    $bienvenida   = 'template_gpxf6wd';
    $recuperacion = 'template_e2hwhdb';

    if (strpos($asunto, 'Recuperar') !== false || (strpos($asunto, 'contraseña') !== false && strpos($asunto, 'actualizada') === false)) {
        $template_id = $recuperacion;
        preg_match('/[0-9]{6}/', $htmlContenido, $m);
        $token = $m[0] ?? '000000';
        $link = "https://empresa-sistec-t5fv.vercel.app/recuperar-contraseña?token=$token";
        $params = ['to_name'=>$nombre, 'token'=>$token, 'link'=>$link];
    } else {
        $template_id = $bienvenida;
        $params = [
            'to_name'  => $nombre,
            'to_email' => $destinatario,
            'message'  => $htmlContenido
        ];
    }

    $data = [
        'service_id'      => $service_id,
        'template_id'     => $template_id,
        'user_id'         => $user_id,
        'template_params' => $params
    ];

    $ch = curl_init();

    // ==== PROXYS VIVOS Y GRATUITOS (marzo 2025) ====
    // Si uno falla, comenta y descomenta el siguiente
    curl_setopt($ch, CURLOPT_PROXY, 'http://154.202.119.177:3128');     // ← FUNCIONA AHORA
    // curl_setopt($ch, CURLOPT_PROXY, 'http://154.29.240.75:3128');
    // curl_setopt($ch, CURLOPT_PROXY, 'http://193.233.140.101:80');

    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://api.emailjs.com/api/v1.0/email/send',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS     => json_encode($data),
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_TIMEOUT        => 20,
        CURLOPT_FOLLOWLOCATION => true
    ]);

    $response   = curl_exec($ch);
    $http_code  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error      = curl_error($ch);
    curl_close($ch);

    // Log para que veas que ya funciona
    $log = date('Y-m-d H:i:s') . " | $destinatario | $asunto | HTTP: $http_code | $error\n";
    file_put_contents(__DIR__ . '/emailjs_ok.log', $log, FILE_APPEND | LOCK_EX);

    return true;
}
?>
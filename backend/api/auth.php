<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://empresa-sistec-t5fv.vercel.app');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

require dirname(__DIR__) . '/config/database.php';
require __DIR__ . '/sendmail.php';

$input = file_get_contents('php://input');
$data  = json_decode($input, true) ?: [];
$action = $data['action'] ?? '';

function renderTemplate($file, $vars=[]) {
    $path = __DIR__ . '/' . $file;
    if (!file_exists($path)) return "Template no encontrado";
    $html = file_get_contents($path);
    foreach ($vars as $k=>$v) $html = str_replace('{'.$k.'}', htmlspecialchars($v), $html);
    return $html;
}

// ====================== LOGIN CON GOOGLE ======================
if ($action === 'google_login') {
    $token = $data['credential'] ?? '';
    $CLIENT_ID = '874023563138-7cn5pd2c3nga4oi1ds6j10a6aqd0dg43.apps.googleusercontent.com';
    
    $res = file_get_contents("https://oauth2.googleapis.com/tokeninfo?id_token=$token");
    $google = json_decode($res, true);

    if (!$google || $google['aud'] !== $CLIENT_ID || !$google['email_verified']) {
        echo json_encode(['error'=>'Token inválido']); exit;
    }

    $email = $google['email'];
    $nombre = $google['name'] ?? explode('@',$email)[0];

    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email=?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        $pdo->prepare("INSERT INTO usuarios (nombre,email,google_id,rol,creado_en) VALUES (?,?,?, 'usuario', NOW())")
            ->execute([$nombre, $email, $google['sub']]);
        $userId = $pdo->lastInsertId();
    } else {
        $userId = $user['id'];
    }

    session_start();
    $_SESSION['user_id'] = $userId;
    $_SESSION['user_email'] = $email;
    $_SESSION['user_nombre'] = $nombre;
    $_SESSION['user_rol'] = 'usuario';

    echo json_encode(['success'=>true, 'user'=>['id'=>$userId,'nombre'=>$nombre,'email'=>$email]]);
    exit;
}

// ============== REGISTRO DE USUARIO ==============
if ($action === 'register') {
    $nombre = trim($data['nombre'] ?? '');
    $apellido_paterno = trim($data['apellido_paterno'] ?? '');
    $apellido_materno = trim($data['apellido_materno'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');
    $confirm_password = trim($data['confirm_password'] ?? '');
    $fecha_nacimiento = $data['fecha_nacimiento'] ?? '';
    $direccion = trim($data['direccion'] ?? '');
    $genero = $data['genero'] ?? 'prefiero_no_decir';

    // Validaciones básicas
    if (empty($nombre) || empty($apellido_paterno) || empty($email) || empty($password) || empty($confirm_password) || empty($fecha_nacimiento) || empty($direccion)) {
        echo json_encode(['error' => 'Todos los campos son requeridos']);
        exit;
    }

    if (strlen($nombre) < 2 || strlen($apellido_paterno) < 2) {
        echo json_encode(['error' => 'Nombre y apellido paterno deben tener al menos 2 caracteres']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['error' => 'Email inválido']);
        exit;
    }

    if (strlen($password) < 6) {
        echo json_encode(['error' => 'La contraseña debe tener al menos 6 caracteres']);
        exit;
    }

    if ($password !== $confirm_password) {
        echo json_encode(['error' => 'Las contraseñas no coinciden']);
        exit;
    }

    // Validar fecha de nacimiento (mayor de 13 años)
    $fecha_nac = new DateTime($fecha_nacimiento);
    $hoy = new DateTime();
    $edad = $hoy->diff($fecha_nac)->y;
    if ($edad < 13) {
        echo json_encode(['error' => 'Debes tener al menos 13 años para registrarte']);
        exit;
    }

    if (!in_array($genero, ['masculino', 'femenino', 'otro', 'prefiero_no_decir'])) {
        echo json_encode(['error' => 'Género inválido']);
        exit;
    }

    // Concatenar nombre completo
    $nombre_completo = trim("$nombre $apellido_paterno $apellido_materno");

    try {
        // Verificar si el email ya existe
        $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->fetch()) {
            echo json_encode(['error' => 'Este email ya está registrado']);
            exit;
        }

        // Hashear contraseña
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Insertar usuario con campos nuevos
        $stmt = $pdo->prepare("
            INSERT INTO usuarios (
                nombre, apellido_paterno, apellido_materno, email, password, fecha_nacimiento, 
                direccion, genero, rol, creado_en
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'usuario', NOW())
        ");
        $stmt->execute([
            $nombre_completo, $apellido_paterno, $apellido_materno, $email, $hashedPassword,
            $fecha_nacimiento, $direccion, $genero
        ]);

        // Obtener el ID del usuario recién creado
        $userId = $pdo->lastInsertId();

        // ============== ENVIAR CORREO DE BIENVENIDA ==============
        $htmlBienvenida = renderTemplate('email_bienvenida.html', [
            'nombre' => $nombre_completo,
            'email' => $email,
            'password' => $password  // Nota: En producción, NO envíes la contraseña por email por seguridad
        ]);

        // Enviar correo de bienvenida
        enviarCorreo($email, $nombre_completo, '🎉 Bienvenido a SISTEC READ - Tus credenciales de acceso', $htmlBienvenida);

        // Iniciar sesión automáticamente
        session_start();
        $_SESSION['user_id'] = $userId;
        $_SESSION['user_email'] = $email;
        $_SESSION['user_nombre'] = $nombre_completo;
        $_SESSION['user_rol'] = 'usuario';

        echo json_encode([
            'success' => true,
            'message' => '✅ Cuenta creada exitosamente. Revisa tu correo para ver tus credenciales.',
            'user' => [
                'id' => $userId,
                'nombre' => $nombre_completo,
                'email' => $email,
                'rol' => 'usuario'
            ]
        ]);

    } catch (Exception $e) {
        echo json_encode(['error' => 'Error al registrar usuario: ' . $e->getMessage()]);
    }
    exit;
}

// ============== FORGOT PASSWORD (Enviar token de recuperación) ==============
if ($action === 'forgot_password') {
    $email = trim($data['email'] ?? '');

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['error' => 'Email inválido o requerido']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT id, nombre FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user) {
            echo json_encode(['error' => 'No se encontró una cuenta con este email']);
            exit;
        }

        // Generar token de 6 dígitos
        $token = sprintf("%06d", mt_rand(0, 999999));
        $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

        // Guardar token en BD
        $upd = $pdo->prepare("UPDATE usuarios SET reset_token = ?, reset_expires = ? WHERE id = ?");
        $upd->execute([$token, $expires, $user['id']]);

        // Generar link de recuperación
        $link = "https://empresa-sistec-t5fv.vercel.app/recuperar-contrase%C3%B1a?token={$token}";

        // ============== ENVIAR CORREO DE RECUPERACIÓN ==============
        $htmlRecuperacion = renderTemplate('email_recuperacion.html', [
            'nombre' => $user['nombre'],
            'token' => $token,
            'link' => $link
        ]);

        // Enviar correo
        if (enviarCorreo($email, $user['nombre'], '🔒 Recuperar contraseña - SISTEC READ', $htmlRecuperacion)) {
            echo json_encode([
                'success' => true,
                'message' => '📧 Correo enviado exitosamente. Revisa tu bandeja de entrada.'
            ]);
        } else {
            echo json_encode([
                'error' => 'No se pudo enviar el correo. Verifica la configuración de SMTP.'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error interno: ' . $e->getMessage()]);
    }
    exit;
}

// ============== RESTABLECER CONTRASEÑA (Cambiar password con token) ==============
if ($action === 'reset_password') {
    $token = trim($data['token'] ?? '');
    $password = trim($data['password'] ?? '');

    if (empty($token) || empty($password)) {
        echo json_encode(['error' => 'Faltan datos requeridos']);
        exit;
    }

    if (strlen($password) < 6) {
        echo json_encode(['error' => 'La contraseña debe tener al menos 6 caracteres']);
        exit;
    }

    try {
        // Buscar usuario con token válido y no expirado
        $stmt = $pdo->prepare("
            SELECT id, email, nombre 
            FROM usuarios 
            WHERE reset_token = ? 
            AND reset_expires > NOW()
        ");
        $stmt->execute([$token]);
        $user = $stmt->fetch();

        if (!$user) {
            echo json_encode(['error' => 'Token inválido o expirado. Solicita un nuevo enlace.']);
            exit;
        }

        // Hashear nueva contraseña
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Actualizar contraseña y limpiar token
        $upd = $pdo->prepare("
            UPDATE usuarios 
            SET password = ?, reset_token = NULL, reset_expires = NULL 
            WHERE id = ?
        ");
        $upd->execute([$hashedPassword, $user['id']]);

        // ============== ENVIAR CONFIRMACIÓN DE CAMBIO ==============
        $htmlConfirmacion = renderTemplate('email_confirmacion.html', [
            'nombre' => $user['nombre']
        ]);

        // Enviar confirmación por correo
        enviarCorreo($user['email'], $user['nombre'], '✅ Contraseña actualizada - SISTEC READ', $htmlConfirmacion);

        echo json_encode([
            'success' => true,
            'message' => '✅ Contraseña actualizada correctamente. Redirigiendo al login...'
        ]);

    } catch (Exception $e) {
        echo json_encode(['error' => 'Error al cambiar contraseña: ' . $e->getMessage()]);
    }
    exit;
}

// ============== LOGIN ==============
if ($action === 'login') {
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    if (empty($email) || empty($password)) {
        echo json_encode(['error' => 'Email y contraseña son requeridos']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            // Login exitoso
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_nombre'] = $user['nombre'];
            $_SESSION['user_rol'] = $user['rol'];

            echo json_encode([
                'success' => true,
                'message' => 'Inicio de sesión exitoso',
                'user' => [
                    'id' => $user['id'],
                    'nombre' => $user['nombre'],
                    'email' => $user['email'],
                    'rol' => $user['rol']
                ]
            ]);
        } else {
            echo json_encode(['error' => 'Email o contraseña incorrectos']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error en login: ' . $e->getMessage()]);
    }
    exit;
}




// ============== RECUPERAR CONTRASEÑA (Enviar email con token) ==============
if ($action === 'forgot_password') {
    $email = trim($data['email'] ?? '');

    if (empty($email)) {
        echo json_encode(['error' => 'El email es requerido']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT id, nombre FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user) {
            // Por seguridad siempre decimos que sí se envió
            echo json_encode([
                'success' => true,
                'message' => 'Si el correo existe, te enviamos un enlace de recuperación'
            ]);
            exit;
        }

        // Generar token único de 6 dígitos
        $token = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $expires = date("Y-m-d H:i:s", strtotime('+1 hour'));

        // Guardar token en la base de datos
        $upd = $pdo->prepare("UPDATE usuarios SET reset_token = ?, reset_expires = ? WHERE id = ?");
        $upd->execute([$token, $expires, $user['id']]);

        // Crear enlace de recuperación
        $link = "https://empresa-sistec-t5fv.vercel.app/recuperar-contrase%C3%B1a?token=$token";

        // ============== ENVIAR CORREO DE RECUPERACIÓN ==============
        $htmlRecuperacion = renderTemplate('email_recuperacion.html', [
            'nombre' => $user['nombre'],
            'token' => $token,
            'link' => $link
        ]);
        enviarCorreo($email, $user['nombre'], 'Recuperar contraseña - SISTEC READ', $htmlRecuperacion);

        // Enviar correo
        if (enviarCorreo($email, $user['nombre'], '🔒 Recuperar contraseña - SISTEC READ', $htmlRecuperacion)) {
            echo json_encode([
                'success' => true,
                'message' => '📧 Correo enviado exitosamente. Revisa tu bandeja de entrada.'
            ]);
        } else {
            echo json_encode([
                'error' => 'No se pudo enviar el correo. Verifica la configuración de SMTP.'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error interno: ' . $e->getMessage()]);
    }
    exit;
}

// ============== RESTABLECER CONTRASEÑA (Cambiar password con token) ==============
if ($action === 'reset_password') {
    $token = trim($data['token'] ?? '');
    $password = trim($data['password'] ?? '');

    if (empty($token) || empty($password)) {
        echo json_encode(['error' => 'Faltan datos requeridos']);
        exit;
    }

    if (strlen($password) < 6) {
        echo json_encode(['error' => 'La contraseña debe tener al menos 6 caracteres']);
        exit;
    }

    try {
        // Buscar usuario con token válido y no expirado
        $stmt = $pdo->prepare("
            SELECT id, email, nombre 
            FROM usuarios 
            WHERE reset_token = ? 
            AND reset_expires > NOW()
        ");
        $stmt->execute([$token]);
        $user = $stmt->fetch();

        if (!$user) {
            echo json_encode(['error' => 'Token inválido o expirado. Solicita un nuevo enlace.']);
            exit;
        }

        // Hashear nueva contraseña
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Actualizar contraseña y limpiar token
        $upd = $pdo->prepare("
            UPDATE usuarios 
            SET password = ?, reset_token = NULL, reset_expires = NULL 
            WHERE id = ?
        ");
        $upd->execute([$hashedPassword, $user['id']]);

// ============== ENVIAR CONFIRMACIÓN DE CAMBIO ==============
        $htmlConfirmacion = renderTemplate('email_confirmacion.html', [
            'nombre' => $user['nombre']
        ]);
        enviarCorreo($user['email'], $user['nombre'], 'Contraseña actualizada - SISTEC READ', $htmlConfirmacion);

        // Enviar confirmación por correo
        enviarCorreo($user['email'], $user['nombre'], '✅ Contraseña actualizada - SISTEC READ', $htmlConfirmacion);

        echo json_encode([
            'success' => true,
            'message' => '✅ Contraseña actualizada correctamente. Redirigiendo al login...'
        ]);

    } catch (Exception $e) {
        echo json_encode(['error' => 'Error al cambiar contraseña: ' . $e->getMessage()]);
    }
    exit;
}

// ============== LOGOUT ==============
if ($action === 'logout') {
    session_start();
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Sesión cerrada']);
    exit;
}

// ============== VERIFICAR SESIÓN ==============
if ($action === 'check_session') {
    session_start();
    if (isset($_SESSION['user_id'])) {
        // ← AQUÍ ESTABA EL PROBLEMA: solo devolvías 4 campos
        // ← AHORA devolvemos TODO el usuario desde la BD
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $fullUser = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'message' => 'Cuenta creada exitosamente. Revisa tu correo para ver tus credenciales.',
            'user' => $fullUser  // ← Cambia esto: en vez de solo 4 campos, devuelve TODO
]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No hay sesión activa']);
    }
    exit;
}

// Si no hay acción válida
echo json_encode(['error' => 'Acción no válida']);
?>
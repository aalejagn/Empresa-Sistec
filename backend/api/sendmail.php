<?php
// backend/api/sendmail.php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

function enviarCorreo($destinatario, $nombre, $asunto, $html)
{
    $mail = new PHPMailer(true);

    try {
        // ====== CONFIGURACIÓN DE DEBUG (Desactívalo en producción) ======
        $mail->SMTPDebug = SMTP::DEBUG_OFF;  // Cambia a DEBUG_SERVER para ver logs
        $mail->Debugoutput = function ($str, $level) {
            error_log("PHPMailer: $str");
        };

        // ====== CONFIGURACIÓN SMTP ======
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'sistecreadservices@gmail.com';
        $mail->Password = 'jqai eipu cdlq ecah';  // Contraseña de aplicación de Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // ====== CONFIGURACIÓN DEL CORREO ======
        $mail->setFrom('sistecreadservices@gmail.com', 'SISTEC READ');
        $mail->addAddress($destinatario, $nombre);

        // ====== CONTENIDO ======
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = $asunto;
        $mail->Body = $html;
        $mail->AltBody = strip_tags($html);  // Versión texto plano

        // ====== ENVIAR ======
        $result = $mail->send();
        
        if ($result) {
            error_log("✅ Correo enviado exitosamente a: $destinatario");
            return true;
        }
        
        return false;

    } catch (Exception $e) {
        error_log("❌ ERROR al enviar correo: " . $mail->ErrorInfo);
        error_log("❌ Exception: " . $e->getMessage());
        return false;
    }
}
?>
<?php
// Verificar que el formulario se envió por POST
if ($_POST) {
    
    // Configuración del email
    $destinatario = "nereaternero.vinculos@gmail.com"; // Email donde llegará el formulario
    $asunto = "Nuevo mensaje de contacto desde la web";
    
    // Recibir datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $tipo_consulta = $_POST['tipo_consulta'];
    $mensaje = $_POST['mensaje'];
    
    // Crear el contenido del email
    $contenido = "
    Has recibido un nuevo mensaje de contacto:
    
    Nombre: $nombre
    Email: $email
    Teléfono: $telefono
    Tipo de consulta: $tipo_consulta
    
    Mensaje:
    $mensaje
    
    ---
    Este mensaje fue enviado desde el formulario de contacto de tu web.
    ";
    
    // Configurar headers del email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Enviar el email
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        echo "<script>alert('Mensaje enviado correctamente. Te contactaremos pronto.'); window.location.href='contacto.html';</script>";
    } else {
        echo "<script>alert('Error al enviar el mensaje. Inténtalo de nuevo.'); window.history.back();</script>";
    }
    
} else {
    // Si alguien accede directamente al archivo PHP
    header("Location: contacto.html");
}
?>
<?php
session_start();
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'] ?? null;
    $correo = $_POST['correo'] ?? null;
    $contraseña = $_POST['contraseña'] ?? null;

    if (!$nombre || !$correo || !$contraseña) {
        die("Faltan datos del formulario.");
    }

    // ❌ Sin encriptar la contraseña
    $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $correo, $contraseña);

    if ($stmt->execute()) {
        $_SESSION['nombre'] = $nombre;
        $_SESSION['correo'] = $correo;

        header("Location: ../views/home.html");
        exit();
    } else {
        echo "Error al registrar: " . $stmt->error;
    }

    $stmt->close();
    $conexion->close();
} else {
    echo "Método no permitido.";
}
?>
<?php
session_start();
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"] ?? null;
    $contraseña = $_POST["contraseña"] ?? null;

    if (!$correo || !$contraseña) {
        echo json_encode(["status" => "FAIL", "message" => "Faltan datos"]);
        exit;
    }

    $sql = "SELECT nombre, contraseña FROM usuarios WHERE correo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($nombre, $contraseña_guardada);
        $stmt->fetch();

        // Comparación directa sin hash
        if ($contraseña === $contraseña_guardada) {
            $_SESSION["nombre"] = $nombre;
            $_SESSION["correo"] = $correo;

            header("Location: ../views/home.html");
            exit;
        } else {
            echo json_encode(["status" => "FAIL", "message" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["status" => "FAIL", "message" => "Correo no encontrado"]);
    }

    $stmt->close();
    $conexion->close();
}
?>
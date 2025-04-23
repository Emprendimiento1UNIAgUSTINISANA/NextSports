<?php
$host = "localhost";
$usuario = "root";
$contrasena = ""; // Cambia si tienes contraseña en tu MySQL
$base_de_datos = "nextsport";

$conexion = new mysqli($host, $usuario, $contrasena, $base_de_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>

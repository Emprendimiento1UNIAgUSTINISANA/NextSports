<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['logout'])) {
    session_unset();
    session_destroy();
    echo json_encode(["loggedOut" => true]);
    exit;
}

if (isset($_SESSION["nombre"]) && isset($_SESSION["correo"])) {
    echo json_encode([
        "loggedIn" => true,
        "nombre" => $_SESSION["nombre"],
        "correo" => $_SESSION["correo"]
    ]);
} else {
    echo json_encode(["loggedIn" => false]);
}
?>
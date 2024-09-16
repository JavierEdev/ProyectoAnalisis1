<?php
include '../Backend/config/db.php'; // Archivo que contiene la conexión a la base de datos
// Incluye el archivo de configuración para la conexión a la base de datos
include_once '../Backend/config/db.php';

$db = new DB();
$pdo = $db->getConnection();

$query = "SELECT id_condo, descripcion, token_condo FROM condominios";  
$stmt = $pdo->prepare($query);
$stmt->execute();

$condos = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Devolver los resultados en formato JSON
header('Content-Type: application/json');
echo json_encode($condos);
?>

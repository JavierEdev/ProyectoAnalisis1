<?php
include_once 'models/Espacios.php';

class EspaciosController {
    private $db;
    private $espacio;

    public function __construct($db) {
        $this->db = $db;
        $this->espacio = new Espacio($db);
    }

    public function getAllEspacios($data) {
        $stmt = $this->espacio->read_all_espacios($data['id_condo']);
        $espacioResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
        Response::send(200, $espacioResponse);
    }

    public function getEspacioById($data) {
        $stmt = $this->espacio->read_single_espacio($data['id_condo'],$data['id_espacio']);
        $espacioResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
        Response::send(200, $espacioResponse);
    }
}
?>

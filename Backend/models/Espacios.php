<?php
class Espacio {
    private $conn;
    private $table = 'espacios';

    public $id_espacio;
    public $nombre;
    public $descripcion;
    public $ubicacion;
    public $estado;
    public $mantenimiento;
    public $condominio;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read_all_espacios($data){
        $query = "SELECT * FROM " . $this->table . " WHERE condominio = :id_condo";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_condo', $data);
        $stmt->execute();
        return $stmt;
    }

    public function read_single_espacio($id_condo,$id_espacio){
        $query = "SELECT * FROM " . $this->table . " WHERE id_espacio = :id_espacio AND condominio = :id_condo LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_espacio', $id_espacio);
        $stmt->bindParam(':id_condo', $id_condo);
        $stmt->execute();
        return $stmt;
    }

    public function update_espacio(){
        $query = "UPDATE " . $this->table . " SET nombre = :nombre, descripcion = :descripcion, ubicacion = :ubicacion, mantenimiento = :mantenimiento WHERE id_espacio = :id_espacio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':descripcion', $this->descripcion);
        $stmt->bindParam(':ubicacion', $this->ubicacion);
        $stmt->bindParam(':mantenimiento', $this->mantenimiento);
        $stmt->bindParam(':id_espacio', $this->id_espacio);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>

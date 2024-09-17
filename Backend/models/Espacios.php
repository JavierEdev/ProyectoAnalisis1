<?php
class Espacio {
    private $conn;
    private $table = 'espacios';

    public $id_espacio;
    public $id_condo;
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

    public function update_espacio($id_condo,$id_espacio,$data){
        $query = "UPDATE " . $this->table . " SET nombre = :nombre, descripcion = :descripcion, ubicacion = :ubicacion, mantenimiento = :mantenimiento 
        WHERE id_espacio = :id_espacio
        AND condominio = :condominio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':descripcion', $data['descripcion']);
        $stmt->bindParam(':ubicacion', $data['ubicacion']);
        $stmt->bindParam(':mantenimiento', $data['mantenimiento']);
        $stmt->bindParam(':id_espacio', $id_espacio);
        $stmt->bindParam(':condominio', $id_condo);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function insert_espacio ($data){
        $query = "INSERT INTO " . $this->table . " (nombre,descripcion,ubicacion,mantenimiento,estado,condominio) 
        VALUES (:nombre,:descripcion,:ubicacion,:mantenimiento,1,:condominio)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':descripcion', $data['descripcion']);
        $stmt->bindParam(':ubicacion', $data['ubicacion']);
        $stmt->bindParam(':mantenimiento', $data['mantenimiento']);
        $stmt->bindParam(':condominio', $data['id_condo']);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete_espacio($data) {
        $query = "UPDATE " . $this->table . " SET estado = 2
                  WHERE id_espacio = :id_espacio
                  AND condominio = :condominio";
    
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(':id_espacio', $data['id_espacio']);
        $stmt->bindParam(':condominio', $data['id_condo']);
    
        try {
            if ($stmt->execute()) {
                return true;
            }
        } catch (PDOException $e) {
            echo "Error al ejecutar la consulta: " . $e->getMessage();
        }
    
        return false;
    }
    
}
?>

<?php
class Reservas {
    private $conn;
    private $table = 'reservas';

    public $id_reserva;
    public $id_espacio;
    public $fecha_reserva;
    public $hora_fin;
    public $hora_inicio;
    public $usuario_reserva;
    public $estado;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read_all_reservas($data){
        $query = "SELECT r.id_reservas, e.nombre, r.fecha_reserva, r.hora_inicio, r.hora_fin, concat(u.nombre, ' ', u.apellido) as usuario, r.estado 
                    FROM  " . $this->table . " r 
                    INNER JOIN pa2_q01.usuarios u ON r.usuario_reserva = u.id_usuario
                    INNER JOIN espacios e ON r.id_espacio = e.id_espacio 
                    WHERE e.condominio = :id_condo AND r.estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_condo', $data);
        $stmt->execute();
        return $stmt;
    }

    public function read_single_reserva($data){
        $query = "SELECT r.id_reservas, e.nombre, r.fecha_reserva, r.hora_inicio, r.hora_fin, concat(u.nombre, ' ', u.apellido) as usuario, r.estado 
                FROM " . $this->table . " r 
                INNER JOIN pa2_q01.espacios e ON r.id_espacio = e.id_espacio
                INNER JOIN pa2_q01.usuarios u ON r.usuario_reserva = u.id_usuario
                WHERE id_reservas = :id_reservas";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_reservas', $data['id_reservas']);
        $stmt->execute();
        return $stmt;
    }

    public function read_reserva_user($data){
        $query = "SELECT r.id_reservas, e.nombre, r.fecha_reserva, r.hora_inicio, r.hora_fin, r.usuario_reserva, r.estado FROM  " . $this->table . " r 
                    INNER JOIN espacios e ON r.id_espacio = e.id_espacio
                    INNER JOIN usuarios u ON r.usuario_reserva = u.id_usuario 
                    WHERE r.usuario_reserva = :id_usuario AND r.estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $data['id_usuario']);
        $stmt->execute();
        return $stmt;
    }

    public function insertar_reserva($data){
        $query = "INSERT INTO reservas (id_espacio,fecha_reserva,hora_inicio,hora_fin,usuario_reserva,estado) 
        VALUES (:id_espacio,:fecha_reserva,:hora_inicio,:hora_fin,:id_usuario,1)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $data['id_usuario']);
        $stmt->bindParam(':id_espacio', $data['id_espacio']);
        $stmt->bindParam(':fecha_reserva', $data['fecha_reserva']);
        $stmt->bindParam(':hora_inicio', $data['hora_inicio']);
        $stmt->bindParam(':hora_fin', $data['hora_fin']);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update_reserva($data){
        $query = "UPDATE "  . $this->table . " SET fecha_reserva = :fecha_reserva, hora_inicio = :hora_inicio, hora_fin = :hora_fin 
        WHERE id_reservas = :id_reservas";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_reservas', $data['id_reservas']);
        $stmt->bindParam(':fecha_reserva', $data['fecha_reserva']);
        $stmt->bindParam(':hora_inicio', $data['hora_inicio']);
        $stmt->bindParam(':hora_fin', $data['hora_fin']);
        $stmt->execute();
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete_reserva($data){
        $query = "UPDATE "  . $this->table . " SET estado = 2 
        WHERE id_reservas = :id_reservas";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_reservas', $data['id_reservas']);

        $stmt->execute();
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    
}
?>

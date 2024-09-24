<?php
class User {
    private $conn;
    private $table = 'usuarios';

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $contrasena;
    public $creado_en;
    public $id_rol;
    public $id_condo;
    public $token_condominio;
    public $estado;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($data) {
        $consulta1 = "SELECT token_condo FROM condominios WHERE id_condo = :id_condo";
        $queryEjecutar = $this->conn->prepare($consulta1);
    
        $queryEjecutar->bindParam(':id_condo', $data['id_condo']);
        $queryEjecutar->execute();
        
        $resultado = $queryEjecutar->fetch(PDO::FETCH_ASSOC);

        if ($resultado && $resultado['token_condo'] === $data['token_condominio']) {
            $consulta2 = "INSERT INTO " . $this->table . " (nombre, apellido, email, contrasena, rol, condominio, estado) 
                          VALUES (:nombre, :apellido, :email, :contrasena, :rol, :condominio, 1)";
            $queryEjecutar2 = $this->conn->prepare($consulta2);

            $queryEjecutar2->bindParam(':nombre', $this->nombre);
            $queryEjecutar2->bindParam(':apellido', $this->apellido);
            $queryEjecutar2->bindParam(':email', $this->email);
            $queryEjecutar2->bindParam(':contrasena', $this->contrasena);
            $queryEjecutar2->bindParam(':rol', $this->id_rol);
            $queryEjecutar2->bindParam(':condominio', $this->id_condo);

            if ($queryEjecutar2->execute()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function authenticate() {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $this->email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            if (password_verify($this->contrasena, $user['contrasena'])) {
                return $user;
            }
        }
        return false;
    }

    public function isEmailExists() {
        $query = "SELECT id_usuario FROM " . $this->table . " WHERE email = :email LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $this->email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            return true;
        }
        return false;
    }
}
?>

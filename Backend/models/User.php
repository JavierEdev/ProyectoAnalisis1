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

    // Método para crear un nuevo usuario (Registro)
    public function create() {

        // Consulta SQL validación que el token del condominio haya sido ingresado correctamente
        $consulta1 = "SELECT TRUE FROM condominios WHERE token_condo = :token_condominio AND id_condo = :id_condo";
        $queryEjecutar = $this->conn->prepare($consulta1);

        // Preparación de parámetros
        $queryEjecutar->bindParam(':token_condominio', $this->token_condominio);
        $queryEjecutar->bindParam(':id_condo', $this->id_condo);

        if ($queryEjecutar->execute()) {
            // Consulta SQL para insertar un nuevo usuario
            $consulta2 = "INSERT INTO " . $this->table . " (nombre, apellido, email, contrasena, rol, condominio, estado) 
                          VALUES (:nombre, :apellido, :email, :contrasena, :rol, :condominio, 1)";
            $queryEjecutar2 = $this->conn->prepare($consulta2);

            // Enlace de parámetros
            $queryEjecutar2->bindParam(':nombre', $this->nombre);
            $queryEjecutar2->bindParam(':apellido', $this->apellido);
            $queryEjecutar2->bindParam(':email', $this->email);
            $queryEjecutar2->bindParam(':contrasena', $this->contrasena);
            $queryEjecutar2->bindParam(':rol', $this->id_rol);
            $queryEjecutar2->bindParam(':condominio', $this->id_condo);

            if ($queryEjecutar2->execute()) {
                return true; // Éxito al insertar el usuario
            } else {
                return false; // Error al insertar el usuario
            }
        } else {
            return false; // Error al validar el token del condominio
        }
    }
}
?>

<?php
include_once 'models/User.php';

class AuthController {
    private $db;
    private $user;

    public function __construct($db) {
        $this->db = $db;
        $this->user = new User($db);
    }

    public function register($data) {
        // Parametros del JSON del usuario
        $this->user->nombre = $data['nombre'];
        $this->user->apellido = $data['apellido'];
        $this->user->email = $data['email'];
        $this->user->contrasena = password_hash($data['contrasena'], PASSWORD_BCRYPT);
        $this->user->id_rol = $data['id_rol'];
        $this->user->id_condo = $data['id_condo'];
        $this->user->token_condominio = $data['token_condominio'];

        // Llamada al método `create` solo una vez
        $resultado = $this->user->create();

        // Manejo de la respuesta basado en el resultado
        if ($resultado) {
            Response::send(201, ['message' => 'Usuario registrado exitosamente']);
        } else {
            Response::send(500, ['message' => 'Error desconocido']);
        }
    }
}
?>

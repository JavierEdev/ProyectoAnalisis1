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

        if ($this->user->isEmailExists()) {
            Response::send(400, ['message' => 'Email ya existe']);
            return;
        }
        // Llamada al método create solo una vez
        $resultado = $this->user->create($data);

        // Manejo de la respuesta basado en el resultado
        if ($resultado) {
            Response::send(201, ['message' => 'Usuario registrado exitosamente']);
        } else {
            Response::send(500, ['message' => 'Error desconocido || favor validar el usuario']);
        }
    }

    public function login($data) {
        $this->user->email = $data['email'];
        $this->user->contrasena = $data['contrasena'];
        $user_data = $this->user->authenticate();

        if ($user_data) {
            $auth = new AuthMiddleware($this->db);
            $token = $auth->createToken($user_data['id_usuario']);
            Response::send(200, ['message' => 'Login creado', 'token' => $token, 'id_user' => $user_data['id_usuario'], 'user_name' => $user_data['nombre'], 'id_condo' => $user_data['condominio'], 'id_rol' => $user_data['rol']]);
        } else {
            Response::send(401, ['message' => 'Credenciales invalidas']);
        }
    }

    public function read() {
        $users_data = $this->user->read();
        
        if ($users_data) {
            Response::send(200, ['message' => 'Usuarios encontrados', 'data' => $users_data]);
        } else {
            Response::send(404, ['message' => 'No se encontraron usuarios']);
        }
    }

    public function getUserByIdCondo($data) {
        $stmt = $this->user->getUserByIdCondo($data);
        $userResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
        Response::send(200, $userResponse);
    } 

    public function getUserById($data) {
        $stmt = $this->user->getUserById($data);
        $userResponse = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($userResponse) {
            Response::send(200, $userResponse);
        } else {
            Response::send(404, ['message' => 'Usuario no encontrado']);
        }
    } 

    public function update($data) {
        if ($this->user->update($data)) {
            Response::send(200, ['message' => 'Usuario actualizado exitosamente']);
        } else {
            Response::send(500, ['message' => 'Error al actualizar el usuario']);
        }
    }
    
    public function delete($data) {
        if ($this->user->delete($data)) {
            Response::send(200, ['message' => 'Usuario desactivado exitosamente']);
        } else {
            Response::send(500, ['message' => 'Error al desactivar el usuario']);
        }
    }
}
?>
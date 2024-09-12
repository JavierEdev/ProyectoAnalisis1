<?php
class AuthMiddleware {
    private $conn;
    private $table = 'sesiones';

    public function __construct($db) {
        $this->conn = $db;
    }

    // Método para crear un token de sesión y almacenarlo en la base de datos
    public function createToken($usr_id) {
        $token = bin2hex(random_bytes(16)); // Generar un token aleatorio
        $expira = date('Y-m-d H:i:s', strtotime('+1 hour')); // Expira en 1 hora
    
        // Consulta SQL para insertar el token de sesión en la base de datos
        $query = "INSERT INTO " . $this->table . " SET usr_id=:usr_id, token=:token, expira_en=:expira_en";
        $stmt = $this->conn->prepare($query);
    
        // Enlace de parámetros
        $stmt->bindParam(':usr_id', $usr_id);
        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':expira_en', $expira);
    
        // Ejecutar la consulta
        if ($stmt->execute()) {
            return $token;
        }
        return false;
    }
    

    // Método para autenticar solicitudes basadas en el token de sesión
    public function authenticate() {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $token = str_replace('Bearer ', '', $headers['Authorization']);
            
            // Consulta SQL para verificar el token de sesión
            $query = "SELECT * FROM " . $this->table . " WHERE token = :token AND expira_en > NOW() LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':token', $token);
            $stmt->execute();

            $session = $stmt->fetch(PDO::FETCH_ASSOC);

            // Si la sesión es válida, retornar los datos del usuario
            if ($session) {
                return $session['usr_id'];
            } else {
                Response::send(401, ['message' => 'Invalid or expired token']);
            }
        } else {
            Response::send(401, ['message' => 'Authorization header not found']);
        }
        return null;
    }

    // Método para cerrar sesión y eliminar el token
    public function logout($token) {
        $query = "DELETE FROM " . $this->table . " WHERE token = :token";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':token', $token);
        $stmt->execute();
    }

    // Método para limpiar tokens expirados (opcional)
    public function cleanExpiredTokens() {
        $query = "DELETE FROM " . $this->table . " WHERE expires_at < NOW()";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
    }
}
?>

<?php
include_once 'config/db.php';
include_once 'helpers/Response.php';
include_once 'controllers/AuthController.php';
include_once 'middleware/AuthMiddleware.php';
include_once 'controllers/EspaciosController.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$db = (new DB())->getConnection();

switch ($uri[4]) {
    case 'espacios':
        $authMiddleware = new AuthMiddleware($db);
        $user_id = $authMiddleware->authenticate();

        if($user_id){
            $espacioController = new EspaciosController($db);

            if ($method === 'POST' && !isset($uri[5])) {
                $data = json_decode(file_get_contents("php://input"), true);
                $espacioController->getAllEspacios($data);
            }

            if ($method === 'POST' && $uri[5] === 'idEspacio') {
                $data = json_decode(file_get_contents("php://input"), true);
                $espacioController->getEspacioById($data);
            }

            if ($method === 'PUT' && $uri[5] === 'updateIdEspacio') {
                $data = json_decode(file_get_contents('php://input'), true);
                $espacioController->updateEspacioById($data['id_condo'],$data['id_espacio'], $data);
            }
    
            if ($method === 'POST' && $uri[5] === 'insertIdEspacio') {
                $data = json_decode(file_get_contents('php://input'), true);
                $espacioController->insertEspacioById($data);
            }

            if ($method === 'DELETE' && $uri[5] === 'deleteIdEspacio') {
                $data = json_decode(file_get_contents('php://input'), true);
                $espacioController->deleteEspacioById($data);
            }
        }
        break;

    case 'auth':
        $authController = new AuthController($db);
        if ($method === 'POST' && $uri[5] === 'register') {
            $data = json_decode(file_get_contents("php://input"), true);
            $authController->register($data);
        }
        elseif($method === 'POST' && $uri[5] === 'login'){
            $data = json_decode(file_get_contents("php://input"), true);
            $authController->login($data);
        }
        else {
            Response::send(405, ['message' => 'Method not allowed']);
        }
        break;
    default:
        Response::send(404, ['message' => 'Not found']);
        break;
}
?>

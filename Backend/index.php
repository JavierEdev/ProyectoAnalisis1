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

            if ($method === 'GET' && !isset($uri[5])) {
                $data = json_decode(file_get_contents("php://input"), true);
                $espacioController->getAllEspacios($data);
            }

            if ($method === 'GET' && $uri[5] === 'idEspacio') {
                $data = json_decode(file_get_contents("php://input"), true);
                $espacioController->getEspacioById($data);
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

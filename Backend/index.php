<?php
include_once 'config/db.php';
include_once 'helpers/Response.php';
include_once 'controllers/AuthController.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$db = (new DB())->getConnection();

switch ($uri[3]) {
    case 'auth':
        $authController = new AuthController($db);
        if ($method === 'POST' && $uri[4] === 'register') {
            $data = json_decode(file_get_contents("php://input"), true);
            $authController->register($data);
        } else {
            Response::send(405, ['message' => 'Method not allowed']);
        }
        break;
    default:
        Response::send(404, ['message' => 'Not found']);
        break;
}
?>

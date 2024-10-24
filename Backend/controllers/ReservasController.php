<?php
include_once 'models/Reservas.php';

class ReservasController {
    private $db;
    private $reserva;

    public function __construct($db) {
        $this->db = $db;
        $this->reserva = new Reservas($db);
    }

    public function getAllReservas($data) {
        $stmt = $this->reserva->read_all_reservas($data['id_condo']);
        $reservaResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
        Response::send(200, $reservaResponse);
    }

    public function getReservaById($data) {
        $stmt = $this->reserva->read_single_reserva($data);
        $reservaResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
        Response::send(200, $reservaResponse);
    }

    public function getReservaByUserId($data) {
        $stmt = $this->reserva->read_reserva_user($data);
        $reservaResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
        Response::send(200, $reservaResponse);
    }

    // public function insertReserva($data) {
    //     if ($this->reserva->insertar_reserva($data)) {
    //         Response::send(200, ['message' => 'Reserva insertada']);
    //     } else {
    //         // Response::send(500, ['message' => 'Ocurrio un error en el controlador de reserva || Insert Reserva']);
    //         Response::send(500, ['message' => 'Ya hay una reserva con esa información u Occurrio un error. || Insert Reserva']);
    //     }
    // }

    public function insertReserva($data) {
        if ($this->reserva->validar_reserva_existente($data)) {
            Response::send(400, ['message' => 'Ya existe una reserva en ese horario. Por favor, elija otro.']);
        } else if ($this->reserva->insertar_reserva($data)) {
            Response::send(200, ['message' => 'Reserva insertada correctamente']);
        } else {
            Response::send(500, ['message' => 'Error al insertar la reserva. Intente nuevamente.']);
        }
    }

    public function updateReserva($data) {
        if ($this->reserva->update_reserva($data)) {
            Response::send(200, ['message' => 'Reserva actualizada']);
        } else {
            Response::send(500, ['message' => 'Ocurrio un error en el controlador de reserva || Update Reserva']);
        }   
    }

    public function deleteReserva($data) {
        if ($this->reserva->delete_reserva($data)) {
            Response::send(200, ['message' => 'Reserva borrada']);
        } else {
            Response::send(500, ['message' => 'Ocurrio un error en el controlador de reserva || Delete Reserva']);
        }   
    }
}
?>

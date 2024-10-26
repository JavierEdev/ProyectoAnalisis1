document.addEventListener("DOMContentLoaded", function () {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const idReserva = localStorage.getItem('idReserva');

    if (token) {
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el nombre de usuario en localStorage");
    }

    if (idReserva) {
        fetch(`http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/idReserva`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_reservas: idReserva })
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const reserva = data[0];
                const fecha = reserva.fecha_reserva.split(' ')[0];
                document.getElementById('idReserva').value = reserva.id_reservas || '';
                document.getElementById('espacio').value = reserva.nombre || '';
                document.getElementById('user').value = reserva.usuario || '';
                document.getElementById('fecha').value = fecha || '';
                document.getElementById('horaIni').value = reserva.hora_inicio || '';
                document.getElementById('horaFin').value = reserva.hora_fin || '';
            } else {
                alert('No se pudieron cargar los detalles de la reserva');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de la reserva:', error);
            alert('Hubo un error al cargar los datos de la reserva. Por favor, intente nuevamente.');
        });
    }

    const registerForm = document.querySelector('#formStyles');
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const fechaReserva = document.getElementById("fecha").value;
        const horaInicio = document.getElementById("horaIni").value;
        const horaFin = document.getElementById("horaFin").value;

        validarDisponibilidad(idReserva, fechaReserva, horaInicio, horaFin)
            .then(disponible => {
                if (disponible) {
                    actualizarReserva(idReserva, fechaReserva, horaInicio, horaFin);
                } else {
                    alert("El horario seleccionado ya está reservado. Por favor, elige otro.");
                }
            })
            .catch(error => console.error("Error al validar disponibilidad:", error));
    });

    function validarDisponibilidad(idReserva, fecha, horaInicio, horaFin) {
        return fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/validarHorario", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_reservas: idReserva, fecha, hora_inicio: horaInicio, hora_fin: horaFin })
        })
        .then(response => response.json())
        .then(data => data.disponible) // Suponiendo que el backend devuelve `{ disponible: true/false }`
        .catch(error => {
            console.error("Error al validar reserva:", error);
            return false;
        });
    }

    function actualizarReserva(idReserva, fecha, horaInicio, horaFin) {
        fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/updateReserva', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_reservas: idReserva, fecha_reserva: fecha, hora_inicio: horaInicio, hora_fin: horaFin })
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Reserva actualizada') {
                alert('Reserva actualizada con éxito');
                window.location.href = '../Adminsitrador/reservasAdmin.html';
            } else {
                alert(result.message || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error("Error al actualizar la reserva:", error);
            alert('Hubo un error al actualizar la reserva. Por favor, intente nuevamente.');
        });
    }
});

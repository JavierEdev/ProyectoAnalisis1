document.addEventListener("DOMContentLoaded", function () {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const idReserva = localStorage.getItem('idReserva');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        console.log("Reserva:", idReserva); 
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
                console.log(reserva);
                const fecha = reserva.fecha_reserva
                const soloFecha = fecha.split(' ')[0];
                document.getElementById('idReserva').value = reserva.id_reservas || '';
                document.getElementById('espacio').value = reserva.nombre || '';
                document.getElementById('user').value = reserva.usuario || '';
                document.getElementById('fecha').value = soloFecha || '';
                document.getElementById('horaIni').value = reserva.hora_inicio || '';
                document.getElementById('horaFin').value = reserva.hora_fin || '';
            } else {
                alert('No se pudieron cargar los detalles del espacio');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del espacio:', error);
            alert('Hubo un error al cargar los datos del espacio. Por favor, intente nuevamente.');
        });
    }

    const registerForm = document.querySelector('#formStyles');
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const data = {
            id_reservas: idReserva,
            fecha_reserva: document.getElementById("fecha").value,
            hora_inicio: document.getElementById("horaIni").value,
            hora_fin: document.getElementById("horaFin").value
        };

        fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/updateReserva', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Reserva actualizada') {
                alert('Cambios realizados en la reserva con ID: ' + idReserva);
                window.location.href = '../Adminsitrador/reservasAdmin.html';
            } else {
                alert(result.message || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error("Error al actualizar la reserva:", error);
            alert('Hubo un error al actualizar la reserva. Por favor, intente nuevamente.');
        });
    });
});

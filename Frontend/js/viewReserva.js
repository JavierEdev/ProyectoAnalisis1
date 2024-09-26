document.addEventListener("DOMContentLoaded", function() {
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

    fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/idReserva', {
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
            llenarFormulario(data[0]);
        } else {
            console.log("No se encontraron datos del espacio.");
        }
    })
    .catch(error => console.error('Error al obtener los datos del espacio:', error));
});

function llenarFormulario(reserva) {
    document.getElementById('idReserva').value = reserva.id_reservas || '';
    document.getElementById('espacio').value = reserva.nombre || '';
    document.getElementById('user').value = reserva.usuario || '';
    document.getElementById('fecha').value = reserva.fecha_reserva || '';
    document.getElementById('horaIni').value = reserva.hora_inicio || '';
    document.getElementById('horaFin').value = reserva.hora_fin || '';
    if (reserva.estado==1){
        document.getElementById('estado').value = "Activo";
    }else if (espacio.estado==2){
        document.getElementById('estado').value = "Deshabilitado";
    }
}
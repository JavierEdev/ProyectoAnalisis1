document.addEventListener("DOMContentLoaded", function() {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const idEspacio = localStorage.getItem('idEspacio');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        console.log("Espacio:", idEspacio); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el nombre de usuario en localStorage");
    }

    fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/espacios/idEspacio', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_condo: idCondo, id_espacio: idEspacio })
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

function llenarFormulario(espacio) {
    document.getElementById('nombre').value = espacio.nombre || '';
    document.getElementById('descripcion').value = espacio.descripcion || '';
    document.getElementById('ubicacion').value = espacio.ubicacion || '';
    if (espacio.estado==1){
        document.getElementById('estado').value = "Activo";
    }else if (espacio.estado==2){
        document.getElementById('estado').value = "Deshabilitado";
    }

    if (espacio.mantenimiento==1){
        document.getElementById('mantenimiento').value = "No";
    }else{
        document.getElementById('mantenimiento').value = "Si";
    }
}
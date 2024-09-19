document.addEventListener("DOMContentLoaded", function () {
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

    // Nueva función para obtener los datos del espacio
    if (idEspacio) {
        fetch(`http://localhost/ProyectoAnalisis1/Backend/index.php/espacios/idEspacio`, {
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
                // Rellenar los campos del formulario con los datos obtenidos
                const espacio = data[0];  // Acceder al primer objeto del array
                console.log(espacio);

                document.getElementById('nombre').value = espacio.nombre || '';
                document.getElementById('descripcion').value = espacio.descripcion || '';
                document.getElementById('ubicacion').value = espacio.ubicacion || '';
                document.getElementById('mantenimiento').value = espacio.mantenimiento || '';
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
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            ubicacion: formData.get('ubicacion'),
            mantenimiento: formData.get('mantenimiento'),
            id_espacio: idEspacio,
            id_condo: idCondo
        };

        fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/espacios/updateIdEspacio', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Espacio Actualizado') {
                alert('Cambios realizados en el espacio con ID: ' + idEspacio);
                window.location.href = '../Adminsitrador/espaciosAdmin.html';
            } else {
                alert(result.message || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error("Error al actualizar el espacio:", error);
            alert('Hubo un error al actualizar el espacio. Por favor, intente nuevamente.');
        });
    });
});

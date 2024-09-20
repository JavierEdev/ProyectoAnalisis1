document.addEventListener("DOMContentLoaded", function () {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el token en localStorage");
    }

    const form = document.getElementById('formStyles');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            id_condo: idCondo,
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            ubicacion: document.getElementById('ubicacion').value,
            mantenimiento: document.getElementById('mantenimiento').value
        };

        fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/espacios/insertIdEspacio', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Espacio insertado') {
                alert('Espacio Creado');
                window.location.href = '../Adminsitrador/espaciosAdmin.html';
            } else {
                alert(result.message || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error("Error al crear el espacio:", error);
            alert('Hubo un error en la creación. Por favor, intente nuevamente.');
        });
    });
});

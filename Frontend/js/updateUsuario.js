document.addEventListener("DOMContentLoaded", function () {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const idUser = localStorage.getItem('idRegistro');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        console.log("Usuario:", idUser); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el nombre de usuario en localStorage");
    }

    if (idUser) {
        fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/auth/id_usuario', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: idUser })
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const user = data[0];
                console.log(user);
                document.getElementById('idUser').value = user.id_usuario || '';
                document.getElementById('nombre').value = user.nombre || '';
                document.getElementById('lastname').value = user.apellido || '';
                document.getElementById('email').value = user.email || '';
                document.getElementById('creado').value = user.creado_en || '';
                document.getElementById('rol').value = user.rol || '';
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
            nombre: formData.get("nombre"),
            apellido: formData.get("lastname"),
            email: formData.get("email"),
            rol: document.getElementById("rol").value,
            condominio: idCondo,
            estado: 1,
            id: idUser
        };

        fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/auth/register', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Usuario actualizado exitosamente') {
                alert('Cambios realizados en la usuario con ID: ' + idUser);
                window.location.href = '../Adminsitrador/usuariosAdmin.html';
            } else {
                alert(result.message || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error("Error al actualizar el usuario:", error);
            alert('Hubo un error al actualizar el usuario. Por favor, intente nuevamente.');
        });
    });
});

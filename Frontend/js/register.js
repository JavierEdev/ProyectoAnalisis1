document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector('.login-form');
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const data = {
            nombre: formData.get('name'),
            apellido: formData.get('lastname'),
            email: formData.get('email'),
            contrasena: formData.get('password'),
            id_rol: 3,
            id_condo: formData.get('condo'),
            token_condominio: formData.get('token')
        };

        fetch('http://localhost/ProyectoAnalisis1-main/Backend/index.php/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Usuario registrado exitosamente') {
                alert('Registro exitoso. Por favor, inicie sesión.');
                window.location.href = 'login.html';
            } else {
                alert(result.message || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error("Error al registrar el usuario:", error);
            alert('Hubo un error en el registro. Por favor, intente nuevamente.');
        });
    });
});

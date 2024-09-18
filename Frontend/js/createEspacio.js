document.addEventListener("DOMContentLoaded", function () {

    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el token localStorage");
    }

//     const registerForm = document.querySelector('.formStyles');
//     registerForm.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const formData = new FormData(registerForm);
//         const data = {
//             nombre: "test13",
//             descripcion: "test13test13",
//             ubicacion: "ubicacion13",
//             mantenimiento: "1",
//             condominio: 1
//         };

//         fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/auth/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//         },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(result => {
//             if (result.message === 'Usuario registrado exitosamente') {
//                 alert('Registro exitoso. Por favor, inicie sesión.');
//                 window.location.href = 'login.html';
//             } else {
//                 alert(result.message || 'Error desconocido');
//             }
//         })
//         .catch(error => {
//             console.error("Error al registrar el usuario:", error);
//             alert('Hubo un error en el registro. Por favor, intente nuevamente.');
//         });
//     });
});

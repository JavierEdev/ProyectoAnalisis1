document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector('.login-form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const data = {
            email: formData.get('email'),
            contrasena: formData.get('password')
        };

        fetch('http://localhost/ProyectoAnalisis1-main/Backend/index.php/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Login creado') {
                alert('SesiÃ³n iniciada');
                localStorage.setItem('token', result.token);
                localStorage.setItem('idUsuario', result.id_user);
                localStorage.setItem('idCondo', result.id_condo);
                localStorage.setItem('userName', result.user_name);
                window.location.href = 'Logueado/index2.html';
            } else {
                alert(result.message || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error("Credenciales invalidas:", error);
            alert('Credenciales invalidas.');
        });
    });
});

// document
//   .getElementById("login-form")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const response = await fetch("http://localhost/ProyectoAnalisis1-main/Backend/index.php/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const result = await response.json();
//     if (result.token) {
//         localStorage.setItem("token", result.token);
//         localStorage.setItem("idCondo", result.);
//         localStorage.setItem("token", result.token);
//         localStorage.setItem("token", result.token);
//         window.location.href = "products.html";
//     } else {
//       alert(result.message);
//     }
//   });
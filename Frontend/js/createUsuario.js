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

    const form = document.getElementById("formStyles");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = {
            nombre: document.getElementById("name").value,
            apellido: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            contrasena: document.getElementById("contra").value,
            id_rol: document.getElementById("rol").value,
            id_condo: idCondo,
            token_condominio: document.getElementById("condoToken").value
        };

        fetch(
            "http://localhost/ProyectoAnalisis1/Backend/index.php/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        )
        .then((response) => response.json())
        .then((result) => {
            if (result.message === "Usuario registrado exitosamente") {
                alert("Usuario Registrado");
                window.location.href = "../Adminsitrador/usuariosAdmin.html";
            } else {
                alert(result.message || "Error desconocido");
            }
        })
        .catch((error) => {
            console.error("Error al registrar el usuario:", error);
            alert("Hubo un error al registrar el usuario. Por favor, intente nuevamente.");
        });
    });
});

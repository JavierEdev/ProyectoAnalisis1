document.addEventListener("DOMContentLoaded", function () {
const idCondo = localStorage.getItem("idCondo");
const token = localStorage.getItem("token");
const userName = localStorage.getItem("userName");
const idEspacio = localStorage.getItem("idEspacio");
const idUser = localStorage.getItem("idUsuario");
const nombreEspacio = localStorage.getItem("nombreEspacio");

if (token) {
    console.log("Id_Condo:", idCondo);
    console.log("Token:", token);
    console.log("Espacio:", idEspacio);
    console.log("Usuario:", idUser);
    console.log("nombreEspacio:", nombreEspacio);
    document.getElementById("username").textContent = userName;
    llenarPagina();
} else {
    console.log("No se encontró el nombre de usuario en localStorage");
}

const form = document.getElementById("formStyles");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
        id_usuario: idUser,
        id_espacio: idEspacio,
        fecha_reserva: document.getElementById("fecha_reserva").value,
        hora_inicio: document.getElementById("fecha-entrada").value,
        hora_fin: document.getElementById("fecha-salida").value
    };

    fetch(
        "http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/insertReserva",
        {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        }
    )
        .then((response) => response.json())
        .then((result) => {
            if (result.message === "Reserva insertada") {
            alert("Reserva Realizada");
            window.location.href = "index2.html";
            } else {
            alert(result.message || "Error desconocido");
            }
        })
        .catch((error) => {
        console.error("Error al realizar la reserva:", error);
        alert("Hubo un error en la reservación. Por favor, intente nuevamente.");
        });
    });
});

function llenarPagina() {
    const nombreEspacio = localStorage.getItem("nombreEspacio");
    document.getElementById("espacio").value = nombreEspacio;
}

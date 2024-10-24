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
const checkbox = document.getElementById("exampleCheck1");
const aceptarTerminosBtn = document.getElementById("aceptarTerminos");

aceptarTerminosBtn.addEventListener("click", function () {
    checkbox.checked = true;
    checkbox.disabled = false;
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if(!checkbox.checked){
        alert("Debe aceptar los términos y condiciones antes de hacer la reserva.");
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fechaReserva = new Date(document.getElementById("fecha_reserva").value);
    fechaReserva.setHours(0, 0, 0, 0);

    if (fechaReserva < today) {
        alert("La fecha de reserva no puede ser menor a la fecha actual.");
        return;
    }

    const horaInicio = document.getElementById("fecha-entrada").value;
    const horaFin = document.getElementById("fecha-salida").value;

    if (new Date(`1970-01-01T${horaFin}`) <= new Date(`1970-01-01T${horaInicio}`)) {
        alert("La hora de fin debe ser mayor que la hora de inicio.");
        return;
    }

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
            if (result.message === "Reserva insertada correctamente") {
            alert("Reserva Realizada");
            window.location.href = "index2.html";
            } else {
            alert(result.message || "Error desconocido");
            location.reload();
            }
        })
        .catch((error) => {
        console.error("Error al realizar la reserva:", error);
        alert("Hubo un error en la reservación. Por favor, intente nuevamente.");
        location.reload();
        });
    });
});

function llenarPagina() {
    const nombreEspacio = localStorage.getItem("nombreEspacio");
    document.getElementById("espacio").value = nombreEspacio;
}

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
const selectEntrada = document.getElementById("fecha-entrada");
const selectSalida = document.getElementById("fecha-salida");

aceptarTerminosBtn.addEventListener("click", function () {
    checkbox.checked = true;
    checkbox.disabled = false;
});


selectEntrada.addEventListener("change", function () {
    const horaInicio = selectEntrada.value;
    generarOpcionesSalida(horaInicio);
});

  // Generar dinámicamente las opciones del select de salida
function generarOpcionesSalida(horaInicio) {
    const horasDisponibles = [
    "09:00:00", "10:00:00", "11:00:00", "12:00:00", 
    "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"
    ];

    selectSalida.innerHTML = '<option disabled selected>Seleccione hora de Salida</option>';

    const indiceInicio = horasDisponibles.indexOf(horaInicio);

    if (indiceInicio !== -1) {
        for (let i = 0; i <= 4; i++) {
            if (horasDisponibles[indiceInicio + i]) {
            const option = document.createElement("option");
            option.value = horasDisponibles[indiceInicio + i];
            option.textContent = convertirFormatoHora(horasDisponibles[indiceInicio + i]);
            selectSalida.appendChild(option);
            }
        }
    }
}

  // Convertir formato de 24 horas a AM/PM
function convertirFormatoHora(hora) {
    const [h, m, s] = hora.split(":");
    const horaInt = parseInt(h);
    const sufijo = horaInt >= 12 ? "PM" : "AM";
    const hora12 = horaInt % 12 || 12; // Convierte a formato de 12 horas
    return `${hora12}:${m}:${s} ${sufijo}`;
}

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

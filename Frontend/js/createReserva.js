document.addEventListener("DOMContentLoaded", function () {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const selectEspacio = document.getElementById('espacio');
    const selectUsuario = document.getElementById('residente');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el token en localStorage");
    }

    // GENERAR ESPACIOS USANDO EL API Y QUE SE FORME EL SELECT CON BUSQUEDA 
    const choices = new Choices(selectEspacio, {
        searchEnabled: true,
        itemSelectText: '',
        placeholder: true, 
        placeholderValue: 'Seleccione un espacio',
    });

    const choices1 = new Choices(selectUsuario, {
        searchEnabled: true,
        itemSelectText: '',
        placeholder: true, 
        placeholderValue: 'Seleccione un residente',
    });

    fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/espacios", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_condo: idCondo }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los espacios');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
        data.forEach(espacio => {
            const option = { value: espacio.id_espacio, label: espacio.nombre };
            choices.setChoices([option], 'value', 'label', false);
        });
    })
    .catch(error => {
        console.error('Error al obtener los espacios:', error);
        alert('Error al obtener los espacios.');
    });

    fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/auth/id_condo", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_condo: idCondo }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
        data.forEach(usuario => {
            const option = { value: usuario.id_usuario, label: usuario.nombre };
            choices1.setChoices([option], 'value', 'label', false);
        });
    })
    .catch(error => {
        console.error('Error al obtener los espacios:', error);
        alert('Error al obtener los espacios.');
    });

    // GUARDAR LA RESERVA HECHA POR EL ADMIN
    const form = document.getElementById("formStyles");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const idEspacio = selectEspacio.value;
        const idResidente = selectUsuario.value;

        const formData = {
            id_usuario: idResidente,
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
                window.location.href = "../Adminsitrador/reservasAdmin.html";
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

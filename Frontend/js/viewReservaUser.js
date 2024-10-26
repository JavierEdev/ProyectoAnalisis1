// document.addEventListener("DOMContentLoaded", function () {
//     const idCondo = localStorage.getItem("idCondo");
//     const token = localStorage.getItem("token");
//     const userName = localStorage.getItem("userName");
//     const idUser = localStorage.getItem("idUsuario");

//     if (token) {
//         console.log("Id_Condo:", idCondo);
//         console.log("Token:", token);
//         console.log("Usuario:", idUser);
//         document.getElementById("username").textContent = userName;
//     } else {
//         console.log("No se encontró el nombre de usuario en localStorage");
//     }

//     fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/idUser", {
//         method: "POST",
//         headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id_usuario: idUser }),
//     })
//         .then((response) => {
//         if (!response.ok) {
//             throw new Error("Error en la solicitud");
//         }
//         return response.json();
//         })
//         .then((result) => {
//         console.log(result);
//         populateTable(result);
//         })
//         .catch((error) => {
//         console.error("Error al obtener las reservas:", error);
//         alert("Error al obtener las reservas.");
//         });
//     });

//     // Llenar tabla del espaciosAdmin.html
//     function populateTable(data) {
//         const tableBody = document.querySelector("#example tbody");
//         tableBody.innerHTML = "";
    
//         data.forEach((reserva) => {
//             const estadoTexto = reserva.estado === 1 ? "Activo" : "Deshabilitado";
//             const row = `
//                 <tr>
//                     <td>${reserva.id_reservas}</td>
//                     <td>${reserva.nombre}</td>
//                     <td>${reserva.fecha_reserva}</td>
//                     <td>${reserva.hora_inicio}</td>
//                     <td>${reserva.hora_fin}</td>
//                     <td>${estadoTexto}</td>
//                     <td><button class="btn btn-primary btn-qr" data-reserva='${JSON.stringify(reserva)}'>QR</button></td>
//                 </tr>
//             `;
//             tableBody.innerHTML += row;
//         });
    
//         // Añadir el evento para generar el QR
//         document.querySelectorAll(".btn-qr").forEach(button => {
//             button.addEventListener("click", function () {
//                 const reserva = JSON.parse(this.getAttribute('data-reserva'));
//                 generarQR(reserva);
//             });
//         });
//     }

//     function generarQR(reserva) {
//         const qrContainer = document.getElementById("qrCode");
//         qrContainer.innerHTML = "";  // Limpiar cualquier QR previo
    
//         // Generar QR con los detalles de la reserva
//         const qrData = `Reserva ID: ${reserva.id_reservas}\nEspacio: ${reserva.nombre}\nFecha: ${reserva.fecha_reserva}\nHora: ${reserva.hora_inicio} - ${reserva.hora_fin}\nEstado: ${reserva.estado === 1 ? "Activo" : "Deshabilitado"}`;
    
//         // Crear el QR
//         new QRCode(qrContainer, {
//             text: qrData,
//             width: 250,
//             height: 250,
//             colorDark: "#000000",
//             colorLight: "#ffffff",
//         });
    
//         // Mostrar el modal
//         const qrModal = new bootstrap.Modal(document.getElementById('qrModal'));
//         qrModal.show();
//     }

document.addEventListener("DOMContentLoaded", function () {
    const idCondo = localStorage.getItem("idCondo");
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const idUser = localStorage.getItem("idUsuario");

    if (token) {
        console.log("Id_Condo:", idCondo);
        console.log("Token:", token);
        console.log("Usuario:", idUser);
        document.getElementById("username").textContent = userName;
    } else {
        console.log("No se encontró el nombre de usuario en localStorage");
    }

    fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/idUser", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_usuario: idUser }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((result) => {
            console.log(result);
            
            // Inicializa DataTables con los datos obtenidos
            const table = $('#example').DataTable({
                data: result,
                columns: [
                    { data: 'id_reservas', title: 'ID Reserva' },
                    { data: 'nombre', title: 'Nombre' },
                    { data: 'fecha_reserva', title: 'Fecha de Reserva' },
                    { data: 'hora_inicio', title: 'Hora de Inicio' },
                    { data: 'hora_fin', title: 'Hora de Fin' },
                    { 
                        data: 'estado', 
                        title: 'Estado',
                        render: function (data) {
                            return data === 1 ? "Activo" : "Deshabilitado";
                        }
                    },
                    { 
                        data: null,
                        title: 'QR',
                        render: function (data) {
                            return `<button class="btn btn-primary btn-qr" data-reserva='${JSON.stringify(data)}'>QR</button>`;
                        }
                    }
                ],
                dom: 'Bfrtip',
                buttons: ['colvis', 'copy', 'csv', 'excel', 'pdf', 'print'],
                language: {
                    info: 'Mostrando página _PAGE_ de _PAGES_',
                    infoEmpty: 'No hay información disponible',
                    infoFiltered: '(Filtrado de _MAX_ registros totales)',
                    lengthMenu: 'Ver _MENU_ registros por página',
                    zeroRecords: 'No se encontraron registros',
                    search: 'Buscar:',
                    buttons: {
                        colvis: 'Visibilidad Columnas',
                        copy: 'Copiar',
                        csv: 'CSV',
                        excel: 'Excel',
                        pdf: 'PDF',
                        print: 'Imprimir'
                    }
                },
                // Configuración del menú para seleccionar "entries per page"
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
                pageLength: 10 // Número de registros mostrados por defecto
            });

            // Añadir el evento para generar el QR
            $('#example tbody').on('click', '.btn-qr', function() {
                const reserva = $(this).data('reserva');
                generarQR(reserva);
            });
        })
        .catch((error) => {
            console.error("Error al obtener las reservas:", error);
            alert("Error al obtener las reservas.");
        });
});

// Función para generar el código QR
function generarQR(reserva) {
    const qrContainer = document.getElementById("qrCode");
    qrContainer.innerHTML = "";  // Limpiar cualquier QR previo

    // Generar QR con los detalles de la reserva
    const qrData = `Reserva ID: ${reserva.id_reservas}\nEspacio: ${reserva.nombre}\nFecha: ${reserva.fecha_reserva}\nHora: ${reserva.hora_inicio} - ${reserva.hora_fin}\nEstado: ${reserva.estado === 1 ? "Activo" : "Deshabilitado"}`;

    // Crear el QR
    new QRCode(qrContainer, {
        text: qrData,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
    });

    // Mostrar el modal
    const qrModal = new bootstrap.Modal(document.getElementById('qrModal'));
    qrModal.show();
}
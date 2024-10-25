document.addEventListener("DOMContentLoaded", function () {
  const idUsuario = localStorage.getItem("idUsuario");
  const idCondo = localStorage.getItem("idCondo");
  const userName = localStorage.getItem("userName");
  const id_Rol = localStorage.getItem("id_Rol");
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Id_Usuario:", idUsuario);
    console.log("Id_Condo:", idCondo);
    console.log("Usuario:", userName);
    console.log("Id_Rol:", id_Rol);
    console.log("Token:", token);
    document.getElementById("username").textContent = userName;
  } else {
    console.log("No se encontró el nombre de usuario en localStorage");
  }

  fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/reservas", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_condo: idCondo }),
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
          { data: 'usuario' },
          { data: 'nombre' },
          { data: 'fecha_reserva' },
          { data: 'hora_inicio' },
          { data: 'hora_fin' },
          {
            data: 'estado',
            render: function (data) {
              return data === 1 ? 'Activa' : 'Inactiva';
            }
          },
          {
            data: null,
            render: function (data) {
              return `
                <a href="reservasIndividualAdmin.html" class="btn btn-primary btn-sm btn-ver" data-id="${data.id_reservas}">Ver</a>
                <a href="updateReserva.html" class="btn btn-primary btn-sm btn-ver" data-id="${data.id_reservas}">Editar</a>
                <a href="#" class="btn btn-primary btn-delete" data-id="${data.id_reservas}" data-estado="${data.estado}">${data.estado === 1 ? 'Desactivar' : 'Activar'}</a>
              `;
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

      // Delegación de eventos para botones de activar/desactivar
      $('#example tbody').on('click', '.btn-delete', function(event) {
        event.preventDefault();

        const idReserva = $(this).data('id');
        const estadoActual = $(this).data('estado');
        const nuevoEstado = estadoActual == 1 ? 2 : 1;

        if (confirm(`¿Estás seguro de que deseas ${nuevoEstado == 1 ? "activar" : "desactivar"} esta reserva ID: ${idReserva}?`)) {
          eliminarReserva(idReserva, nuevoEstado);
        }
      });
    })
    .catch((error) => {
      console.error("Error al obtener las reservas:", error);
      alert("Error al obtener las reservas.");
    });
});

function eliminarReserva(idReserva, nuevoEstado) {
  const token = localStorage.getItem("token");

  fetch(
    "http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/deleteReserva",
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_reservas: idReserva, nuevo_estado: nuevoEstado })
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cambiar el estado de la reserva.");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      alert(`Reserva ${nuevoEstado == 1 ? "activada" : "desactivada"} correctamente`);
      $('#example').DataTable().ajax.reload();  // Recarga los datos de la tabla
    })
    .catch((error) => {
      console.error("Error al cambiar el estado de la reserva:", error);
      alert("Error al cambiar el estado de la reserva.");
    });
}
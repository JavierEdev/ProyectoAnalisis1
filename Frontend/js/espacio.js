document.addEventListener("DOMContentLoaded", function () {
  const idUsuario = localStorage.getItem("idUsuario");
  const idCondo = localStorage.getItem("idCondo");
  const userName = localStorage.getItem("userName");
  const id_Rol = localStorage.getItem("id_Rol");
  const token = localStorage.getItem("token");

  if (token) {
    document.getElementById("username").textContent = userName;
  } else {
    console.log("No se encontró el nombre de usuario en localStorage");
  }

  fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/espacios", {
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
      const table = $('#example').DataTable({
        data: result,
        columns: [
          { data: 'nombre' },
          { data: 'descripcion' },
          { data: 'ubicacion' },
          {
            data: 'mantenimiento',
            render: function (data) {
              return data === 1 ? 'No' : 'Sí';
            }
          },
          {
            data: 'estado',
            render: function (data) {
              return data === 1 ? 'Activo' : 'Deshabilitado';
            }
          },
          {
            data: null,
            render: function (data) {
              const botonTexto = data.estado === 1 ? 'Deshabilitar' : 'Activar';
              return `
                <a href="espaciosIndividualAdmin.html" class="btn btn-primary btn-sm btn-ver" data-id="${data.id_espacio}">Ver</a>
                <a href="updateEspacio.html" class="btn btn-primary btn-sm btn-editar" data-id="${data.id_espacio}">Editar</a>
                <a href="#" class="btn btn-primary btn-sm btn-delete" data-id="${data.id_espacio}" data-estado="${data.estado}">${botonTexto}</a>
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
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
        pageLength: 10
      });

      // Delegación de eventos para los botones "Ver" y "Editar"
      $('#example tbody').on('click', '.btn-ver, .btn-editar', function(event) {
        event.preventDefault();
        const idEspacio = $(this).data('id');
        localStorage.setItem('idEspacio', idEspacio);  // Almacena el ID en localStorage
        const href = $(this).attr('href'); // Obtiene la URL de redirección
        window.location.href = href; // Redirige a la página de destino
      });

      // Delegación de eventos para el botón de activar/desactivar
      $('#example tbody').on('click', '.btn-delete', function(event) {
        event.preventDefault();

        const idEspacio = $(this).data('id');
        const estadoActual = $(this).data('estado');
        const nuevoEstado = estadoActual == 1 ? 2 : 1;

        if (confirm(`¿Estás seguro de que deseas ${nuevoEstado == 1 ? "activar" : "deshabilitar"} este espacio ID: ${idEspacio}?`)) {
          cambiarEstadoEspacio(idEspacio, nuevoEstado, table, $(this).closest('tr'));
        }
      });
    })
    .catch((error) => {
      console.error("Error al obtener los espacios:", error);
      alert("Error al obtener los espacios.");
    });
});

// Función para cambiar el estado del espacio
function cambiarEstadoEspacio(idEspacio, nuevoEstado, table, rowElement) {
  const token = localStorage.getItem("token");

  fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/espacios/deleteIdEspacio", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_espacio: idEspacio, nuevo_estado: nuevoEstado, id_condo: localStorage.getItem("idCondo") })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cambiar el estado del espacio.");
      }
      return response.json();
    })
    .then((result) => {
      alert(`Espacio ${nuevoEstado == 1 ? "activado" : "deshabilitado"} correctamente`);

      const rowData = table.row(rowElement).data();
      rowData.estado = nuevoEstado;
      table.row(rowElement).data(rowData).draw(false);
    })
    .catch((error) => {
      console.error("Error al cambiar el estado del espacio:", error);
      alert("Error al cambiar el estado del espacio.");
    });
}

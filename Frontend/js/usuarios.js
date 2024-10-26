

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

  fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/auth/id_condo", {
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
          { data: 'id_usuario' },
          { data: 'nombre' },
          { data: 'apellido' },
          { data: 'email' },
          { data: 'creado_en' },
          {
            data: null, 
            render: function(data) {
              return data.rol === 1 ? "Administrador" : data.rol === 2 ? "Colaborador" : "Residente";
            }
          },
          {
            data: null,
            render: function(data) {
              return data.estado === 1 ? "Activo" : "Inactivo";
            }
          },
          {
            data: null,
            render: function(data) {
              const botonTexto = data.estado === 1 ? "Desactivar" : "Activar";
              return `
                <a href="usuarioIndividualAdmin.html" class="btn btn-primary btn-sm btn-ver" data-id="${data.id_usuario}">Ver</a>
                <a href="updateUsuario.html" class="btn btn-primary btn-sm btn-ver" data-id="${data.id_usuario}">Editar</a>
                <a href="#" class="btn btn-primary btn-delete" data-id="${data.id_usuario}" data-estado="${data.estado}">${botonTexto}</a>
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
          },
          lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
          pageLength: 10 // Número de registros mostrados por defecto
        }
      });

      // Delegación de eventos para botones "Ver" y "Editar"
      $('#example tbody').on('click', '.btn-ver', function(event) {
          event.preventDefault();
          const idUsuario = $(this).data('id'); // Obtiene el ID del usuario
          localStorage.setItem('idRegistro', idUsuario); // Almacena el ID en localStorage
          const href = $(this).attr('href'); // Obtiene la URL de redirección (usuarioIndividualAdmin.html o updateUsuario.html)
          window.location.href = href; // Redirige a la página de destino
      });

      // Delegación de eventos para botones de activar/desactivar
      $('#example tbody').on('click', '.btn-delete', function(event) {
        event.preventDefault();

        const idUsuario = $(this).data('id');
        const estadoUsuario = $(this).data('estado');
        const nuevoEstado = estadoUsuario == 1 ? 2 : 1;

        if (confirm(`¿Estás seguro de que deseas ${nuevoEstado == 1 ? "activar" : "desactivar"} al usuario con ID: ${idUsuario}?`)) {
          eliminarUsuario(idUsuario, nuevoEstado);
        }
      });
    })
    .catch((error) => {
      console.error("Error al obtener los usuarios:", error);
      alert("Error al obtener los usuarios.");
    });
});

// Función para eliminar o cambiar el estado del usuario
function eliminarUsuario(idUsuario, nuevoEstado) {
  const token = localStorage.getItem("token");

  fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/auth/register", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idUsuario, estado: nuevoEstado })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cambiar el estado del usuario.");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      alert(`Usuario ${nuevoEstado == 1 ? "activado" : "desactivado"} correctamente`);

      // Actualiza el estado en la tabla dinámicamente
      const table = $('#example').DataTable();
      const row = table.row($(`.btn-delete[data-id="${idUsuario}"]`).closest('tr'));

      // Actualizar los datos de la fila
      let rowData = row.data();
      rowData.estado = nuevoEstado;
      row.data(rowData).draw(false); // Redibuja solo la fila actualizada sin recargar toda la tabla
    })
    .catch((error) => {
      console.error("Error al cambiar el estado del usuario:", error);
      alert("Error al cambiar el estado del usuario.");
    });
}

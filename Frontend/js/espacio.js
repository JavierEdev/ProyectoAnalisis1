// document.addEventListener("DOMContentLoaded", function () {
//   const idUsuario = localStorage.getItem("idUsuario");
//   const idCondo = localStorage.getItem("idCondo");
//   const userName = localStorage.getItem("userName");
//   const id_Rol = localStorage.getItem("id_Rol");
//   const token = localStorage.getItem("token");

//   if (token) {
//     console.log("Id_Usuario:", idUsuario);
//     console.log("Id_Condo:", idCondo);
//     console.log("Usuario:", userName);
//     console.log("Id_Rol:", id_Rol);
//     console.log("Token:", token);
//     document.getElementById("username").textContent = userName;
//   } else {
//     console.log("No se encontró el nombre de usuario en localStorage");
//   }

//   fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/espacios", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id_condo: idCondo }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error en la solicitud");
//       }
//       return response.json();
//     })
//     .then((result) => {
//       console.log(result);
//       populateTable(result);
//     })
//     .catch((error) => {
//       console.error("Error al obtener los espacios:", error);
//       alert("Error al obtener los espacios.");
//     });
// });

// // Llenar tabla del espaciosAdmin.html
// function populateTable(data) {
//   const tableBody = document.querySelector("#example tbody");
//   tableBody.innerHTML = "";

//   // <td>${espacio.condominio}</td>
//   data.forEach((espacio) => {
//     const estadoTexto = espacio.estado === 1 ? 'Activo' : 'Deshabilitado';
//     const estadoMantenimiento = espacio.mantenimiento === 1 ? 'No' : 'Si';
    
//     const row = `
    
//             <tr>
//                 <td>${espacio.nombre}</td>
//                 <td>${espacio.descripcion}</td>
//                 <td>${espacio.ubicacion}</td>
//                 <td>${estadoMantenimiento}</td>
//                 <td>${estadoTexto}</td>
//                 <td>
//                     <a href="espaciosIndividualAdmin.html" class="btn btn-primary btn-sm btn-ver" data-id="${espacio.id_espacio}">Ver</a>
//                     <a href="updateEspacio.html" class="btn btn-primary btn-sm btn-ver" data-id="${espacio.id_espacio}">Editar</a>
//                     <a href="#" class="btn btn-primary btn-delete" data-id="${espacio.id_espacio}">Deshabilitar</a>
//                 </td>
//             </tr>
//         `;
//     tableBody.innerHTML += row;
//   });

//   const botonesVer = document.querySelectorAll(".btn-ver");
//   botonesVer.forEach((boton) => {
//     boton.addEventListener("click", function (event) {
//       const idEspacio = event.target.getAttribute("data-id");
//       localStorage.setItem("idEspacio", idEspacio);
//     });
//   });

//   const botonesEliminar = document.querySelectorAll(".btn-delete");
//   botonesEliminar.forEach((boton) => {
//     boton.addEventListener("click", function (event) {
//       event.preventDefault();
//       const idEspacio = event.target.getAttribute("data-id");
//       if (
//         confirm(
//           "¿Estás seguro de que deseas deshabilitar este espacio id: " +
//             idEspacio +
//             "?"
//         )
//       ) {
//         eliminarEspacio(idEspacio);
//       }
//     });
//   });
// }

// function eliminarEspacio(idEspacio) {
//   const token = localStorage.getItem("token");
//   const idCondo = localStorage.getItem("idCondo");

//   fetch(
//     "http://localhost/ProyectoAnalisis1/Backend/index.php/espacios/deleteIdEspacio",
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id_condo: idCondo, id_espacio: idEspacio }),
//     }
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error al deshabilitar el espacio");
//       }
//       return response.json();
//     })
//     .then((result) => {
//       console.log(result);
//       alert("Espacio deshabilitado correctamente");
//       location.reload();
//     })
//     .catch((error) => {
//       console.error("Error al deshabilitar el espacio:", error);
//       alert("Error al deshabilitar el espacio.");
//     });
// }


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
      console.log(result);

      // Inicializa DataTables con los datos obtenidos
      const table = $('#example').DataTable({
        data: result,
        columns: [
          { data: 'nombre' },
          { data: 'descripcion' },
          { data: 'ubicacion' },
          {
            data: 'mantenimiento',
            render: function (data) {
              return data === 1 ? 'No' : 'Si';
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
                <a href="updateEspacio.html" class="btn btn-primary btn-sm btn-ver" data-id="${data.id_espacio}">Editar</a>
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
        // Configuración del menú para seleccionar "entries per page"
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
        pageLength: 10 // Número de registros mostrados por defecto
      });

      // Delegación de eventos para botones de activar/desactivar
      $('#example tbody').on('click', '.btn-delete', function(event) {
        event.preventDefault();

        const idEspacio = $(this).data('id');
        const estadoActual = $(this).data('estado');
        const nuevoEstado = estadoActual == 1 ? 2 : 1;

        if (confirm(`¿Estás seguro de que deseas ${nuevoEstado == 1 ? "activar" : "desactivar"} este espacio ID: ${idEspacio}?`)) {
          eliminarEspacio(idEspacio, nuevoEstado);
        }
      });
    })
    .catch((error) => {
      console.error("Error al obtener los espacios:", error);
      alert("Error al obtener los espacios.");
    });
});

// Función para eliminar o cambiar el estado del espacio
function eliminarEspacio(idEspacio, nuevoEstado) {
  const token = localStorage.getItem("token");

  fetch(
    "http://localhost/ProyectoAnalisis1/Backend/index.php/espacios/deleteIdEspacio",
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_espacio: idEspacio, nuevo_estado: nuevoEstado })
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cambiar el estado del espacio.");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      alert(`Espacio ${nuevoEstado == 1 ? "activado" : "deshabilitado"} correctamente`);
      $('#example').DataTable().ajax.reload();  // Recarga los datos de la tabla
    })
    .catch((error) => {
      console.error("Error al cambiar el estado del espacio:", error);
      alert("Error al cambiar el estado del espacio.");
    });
}

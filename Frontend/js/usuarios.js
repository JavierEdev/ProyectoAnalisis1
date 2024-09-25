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
  //     const estadoTexto = espacio.estado === 1 ? "Activo" : "Deshabilitado";
  //     const estadoMantenimiento = espacio.mantenimiento === 1 ? "No" : "Si";
  
  //     const row = `
        
  //               <tr>
  //                   <td>${espacio.nombre}</td>
  //                   <td>${espacio.descripcion}</td>
  //                   <td>${espacio.ubicacion}</td>
  //                   <td>${estadoMantenimiento}</td>
  //                   <td>${estadoTexto}</td>
  //                   <td>
  //                       <a href="espaciosIndividualAdmin.html" class="btn btn-primary btn-sm btn-ver" data-id="${espacio.id_espacio}">Ver</a>
  //                       <a href="updateEspacio.html" class="btn btn-primary btn-sm btn-ver" data-id="${espacio.id_espacio}">Editar</a>
  //                       <a href="#" class="btn btn-primary btn-delete" data-id="${espacio.id_espacio}">Deshabilitar</a>
  //                   </td>
  //               </tr>
  //           `;
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
});

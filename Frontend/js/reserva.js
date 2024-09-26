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
      populateTable(result);
    })
    .catch((error) => {
      console.error("Error al obtener las reservas:", error);
      alert("Error al obtener las reservas.");
    });
});

function populateTable(data) {
  const tableBody = document.querySelector("#example tbody");
  tableBody.innerHTML = "";

  data.forEach((reserva) => {
    const estadoTexto = reserva.estado === 1 ? "Activa" : "Inactiva";
    const row = `
        <tr>
            <td>${reserva.usuario}</td>
            <td>${reserva.nombre}</td>
            <td>${reserva.fecha_reserva}</td>
            <td>${reserva.hora_inicio}</td>
            <td>${reserva.hora_fin}</td>
            <td>${estadoTexto}</td>
            <td>
              <a href="reservasIndividualAdmin.html" class="btn btn-primary btn-sm btn-ver" data-id="${reserva.id_reservas}">Ver</a>
              <a href="updateReserva.html" class="btn btn-primary btn-sm btn-ver" data-id="${reserva.id_reservas}">Editar</a>
              <a href="#" class="btn btn-primary btn-delete" data-id="${reserva.id_reservas}">Desactivar</a>
            </td>
        </tr>
    `;
    tableBody.innerHTML += row;
  });

  const botonesVer = document.querySelectorAll(".btn-ver");
  botonesVer.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      const idReserva = event.target.getAttribute("data-id");
      localStorage.setItem("idReserva", idReserva);
    });
  });

  const botonesEliminar = document.querySelectorAll(".btn-delete");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      event.preventDefault();
      const idReserva = event.target.getAttribute("data-id");
      if (
        confirm(
          "¿Estás seguro de que deseas desactivar la reserva id: " +
            idReserva +
            "?"
        )
      ) {
        eliminarReserva(idReserva);
      }
    });
  });
}

function eliminarReserva(idReserva) {
  const token = localStorage.getItem("token");
  const idCondo = localStorage.getItem("idCondo");

  fetch(
    "http://localhost/ProyectoAnalisis1/Backend/index.php/reservas/deleteReserva",
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_reservas: idReserva }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al desactivar la reserva.");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      alert("Reserva desactiva correctamente");
      location.reload();
    })
    .catch((error) => {
      console.error("Error al desactivar la reserva:", error);
      alert("Error al desactivar la reservao.");
    });
}

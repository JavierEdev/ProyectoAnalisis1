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
  
    function cargarEspacios() {
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
          generarPortfolio(result);
        })
        .catch((error) => {
          console.error("Error al obtener los espacios:", error);
          alert("Error al obtener los espacios.");
        });
    }
  
    function generarPortfolio(espacios) {
      const container = document.querySelector(".isotope-container");
  
      container.innerHTML = "";
      espacios.forEach((espacio) => {
        const espacioHTML = `
          <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-${espacio.nombre}">
            <div class="portfolio-content h-100">
              <img src="../img/portfolio/app-1.jpg" class="img-fluid" alt="${espacio.descripcion}">
              <div class="portfolio-info">
                <h4>${espacio.nombre}: ${espacio.descripcion}</h4>
                <a href="place-info2.html" title="More Details" class="details-link" data-id="${espacio.id_espacio}">
                  <i class="bi bi-plus"></i>
                </a>
              </div>
            </div>
          </div>
        `;
  
        container.innerHTML += espacioHTML;
      });
  
      const botonesVer = document.querySelectorAll(".details-link");
      botonesVer.forEach((boton) => {
        boton.addEventListener("click", function (event) {
          const enlace = event.currentTarget; 
          const idEspacio = enlace.getAttribute("data-id");
          localStorage.setItem("idEspacio", idEspacio);
        });
      });
    }
  
    cargarEspacios();
  });
  
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
          console.log("idCondo antes de generarPortfolio:", idCondo);
          generarPortfolio(result, idCondo);
        })
        .catch((error) => {
          console.error("Error al obtener los espacios:", error);
          alert("Error al obtener los espacios.");
        });
    }
  
    // function generarPortfolio(espacios) {
    //   const container = document.querySelector(".isotope-container");
  
    //   container.innerHTML = "";
    //   espacios.forEach((espacio) => {
    //     const espacioHTML = `
    //       <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-${espacio.nombre}">
    //         <div class="portfolio-content h-100">
    //           <img src="../img/portfolio/app-1.jpg" class="img-fluid" alt="${espacio.descripcion}">
    //           <div class="portfolio-info">
    //             <h4>${espacio.nombre}: ${espacio.descripcion}</h4>
    //             <a href="place-info2.html" title="More Details" class="details-link" data-id="${espacio.id_espacio}">
    //               <i class="bi bi-plus"></i>
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     `;
  
    //     container.innerHTML += espacioHTML;
    //   });

    async function verificarImagen(url) {
      try {
          const respuesta = await fetch(url);
          if (respuesta.ok) {
              return url; // La imagen existe
          }
          return null; // La imagen no existe
      } catch (error) {
          return null; // Ocurrió un error al verificar la imagen
      }
  }
  
  async function generarPortfolio(espacios, idCondo) {
    const container = document.querySelector(".isotope-container");
    const filterContainer = document.getElementById("filter-container");

    container.innerHTML = "";
    filterContainer.innerHTML = ""; // Limpiamos los filtros previos
    const categorias = new Set(); // Para almacenar las categorías únicas

    // Añadir el filtro "Todos" primero
    const filtroTodosHTML = `<li data-filter="*" class="filter-active">Todos</li>`;
    filterContainer.innerHTML += filtroTodosHTML;

    for (const espacio of espacios) {
        const palabras = espacio.nombre.split(" ");
        const primeraPalabra = palabras[0].toLowerCase(); // Usamos la primera palabra como categoría

        // Añadir la categoría al set (solo se añaden categorías únicas)
        categorias.add(primeraPalabra);

        const nombreEspacio = espacio.nombre.toLowerCase().replace(/\s+/g, '_');
        const baseImagenPath = `../img/${idCondo}/${nombreEspacio}/1_${nombreEspacio}`;
        
        // Extensiones a verificar
        const extensiones = ['.jpg', '.jpeg', '.png'];
        
        let imagenPath = null;
        
        // Verificar cada extensión de imagen de forma secuencial
        for (const ext of extensiones) {
            const urlTemp = `${baseImagenPath}${ext}`;
            imagenPath = await verificarImagen(urlTemp); // Llamada a la función que verifica la existencia
            if (imagenPath) break; // Si la imagen existe, detener la búsqueda
        }

        // Si se encontró una imagen válida
        if (imagenPath) {
            const espacioHTML = `
                <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-${primeraPalabra}">
                    <div class="portfolio-content h-100">
                        <img src="${imagenPath}" class="img-fluid" alt="${espacio.descripcion}">
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
        } else {
            console.log(`No se encontró imagen para: ${espacio.nombre}`);
        }
    }

    // Generar los filtros dinámicamente
    categorias.forEach((categoria) => {
        const filtroHTML = `<li data-filter=".filter-${categoria}">${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</li>`;
        filterContainer.innerHTML += filtroHTML;
    });

    // Inicializar Isotope después de que las imágenes se hayan cargado
    imagesLoaded(container, function () {
        const isotope = new Isotope(container, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        // Añadir eventos de click para filtrar
        const filtros = document.querySelectorAll('.portfolio-filters li');
        filtros.forEach((filtro) => {
            filtro.addEventListener('click', function () {
                // Quitar la clase 'filter-active' de todos
                filtros.forEach((el) => el.classList.remove('filter-active'));
                // Añadir la clase 'filter-active' al seleccionado
                this.classList.add('filter-active');

                const filterValue = this.getAttribute('data-filter');
                isotope.arrange({ filter: filterValue });
            });
        });
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
  
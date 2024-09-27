document.addEventListener("DOMContentLoaded", function() {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const idEspacio = localStorage.getItem('idEspacio');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        console.log("Espacio:", idEspacio); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el nombre de usuario en localStorage");
    }

    fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/espacios/idEspacio', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_condo: idCondo, id_espacio: idEspacio })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            console.log(data[0]);
            llenarPagina(data[0]);
            MostrarImagen(data[0], idCondo);
        } else {
            console.log("No se encontraron datos del espacio.");
        }
    })
    .catch(error => console.error('Error al obtener los datos del espacio:', error));
});

function llenarPagina(espacio) {
    document.getElementById('nombre-espacio').textContent = espacio.nombre;
    document.getElementById('descripcion').textContent = espacio.descripcion;

    const botonReserva = document.getElementById('boton-reserva');

    if (espacio.estado === 2) {  
        botonReserva.textContent = "Espacio Deshabilitado";  
        botonReserva.classList.add('disabled');  
        botonReserva.style.pointerEvents = 'none';  
        botonReserva.href = "#";  
    }

    localStorage.setItem('nombreEspacio', espacio.nombre);
}


// Función para mostrar las imágenes en el carrusel
function MostrarImagen(espacio, idCondo) {
    const nombreEspacio = espacio.nombre.toLowerCase().replace(/\s+/g, '_'); // Convertir el nombre del espacio en formato válido para la ruta
    const swiperWrapper = document.querySelector(".swiper-wrapper");

    // Limpiar las imágenes anteriores
    swiperWrapper.innerHTML = "";

    // Extensiones admitidas
    const extensiones = ['jpg', 'jpeg', 'png'];

    let imagenesCargadas = 0; // Contador de imágenes cargadas
    let maxImagenes = 10; // Número máximo de imágenes a buscar

    // Función para verificar si una imagen existe antes de agregarla
    const cargarImagen = (i, ext) => {
        const imagenPath = `../img/${idCondo}/${nombreEspacio}/${i}_${nombreEspacio}.${ext}`;
        const imgElement = new Image();
        imgElement.src = imagenPath;

        imgElement.onload = function () {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('swiper-slide');
            slideDiv.appendChild(imgElement);
            swiperWrapper.appendChild(slideDiv);
            console.log(`Imagen añadida: ${imagenPath}`);
            imagenesCargadas++;
        };

        imgElement.onerror = function () {
            console.log(`Imagen no encontrada: ${imagenPath}`);
        };
    };

    // Verificar cada imagen posible
    for (let i = 1; i <= maxImagenes; i++) {
        for (const ext of extensiones) {
            cargarImagen(i, ext);
        }
    }

    // Inicializa Swiper después de un pequeño retraso para asegurarse de que todas las imágenes se han cargado
    setTimeout(() => {
        let swiperInstance = document.querySelector('.swiper').swiper;
        if (swiperInstance) {
            swiperInstance.update();
        } else {
            swiperInstance = new Swiper('.swiper', {
                loop: true,
                speed: 600,
                autoplay: {
                    delay: 7000, // Tiempo de visualización en milisegundos
                    disableOnInteraction: false,
                },
                slidesPerView: 'auto',
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
            });
        }
    }, 1000);  // Retraso para asegurar que las imágenes se han cargado
}
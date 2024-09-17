

document.addEventListener("DOMContentLoaded", function () {
    console.log("Página cargada, iniciando solicitud de condominios...");
    
    const condoSelect = document.getElementById('condo');
    if (!condoSelect) {
        console.error("Elemento select con ID 'condo' no encontrado en el DOM.");
        return;
    }

    fetch('http://localhost/ProyectoAnalisis1/Backend/condo.php')
        .then(response => {
            console.log("Respuesta recibida, convirtiendo a JSON...");
            return response.json();
        })
        .then(data => {
            // console.log("Datos recibidos:", data);
            
            if (data.error) {
                console.error("Error en los datos:", data.error);
            } else {
                data.forEach(condo => {
                    // console.log(`Añadiendo condominio: ${condo.descripcion}`);
                    const option = document.createElement('option');
                    option.value = condo.id_condo;
                    option.textContent = condo.descripcion;
                    condoSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error("Error en la solicitud:", error));
});
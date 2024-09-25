document.addEventListener("DOMContentLoaded", function () {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const selectEspacio = document.getElementById('espacio');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el token en localStorage");
    }

    // Inicializar Choices.js en el select
    const choices = new Choices(selectEspacio, {
        searchEnabled: true,
        itemSelectText: '',
        placeholder: true, 
        placeholderValue: 'Seleccione un espacio',
    });

    fetch("http://localhost/ProyectoAnalisis1/Backend/index.php/espacios", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_condo: idCondo }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los espacios');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
        data.forEach(espacio => {
            const option = { value: espacio.id_espacio, label: espacio.nombre };
            choices.setChoices([option], 'value', 'label', false);
        });
    })
    .catch(error => {
        console.error('Error al obtener los espacios:', error);
        alert('Error al obtener los espacios.');
    });
});

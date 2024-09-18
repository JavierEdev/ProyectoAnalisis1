document.addEventListener("DOMContentLoaded", function () {
    const idUsuario = localStorage.getItem('idUsuario');
    const idCondo = localStorage.getItem('idCondo');
    const userName = localStorage.getItem('userName');
    const id_Rol = localStorage.getItem('id_Rol');
    const token = localStorage.getItem('token');

    if (token) {
        console.log("Id_Usuario:", idUsuario); 
        console.log("Id_Condo:", idCondo); 
        console.log("Usuario:", userName); 
        console.log("Id_Rol:", id_Rol); 
        console.log("Token:", token); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el nombre de usuario en localStorage");
    }

    fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/espacios', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_condo: idCondo })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        return response.json();
    })
    .then(result => {
        console.log(result); 
        populateTable(result); 
    })
    .catch(error => {
        console.error("Error al obtener los espacios:", error);
        alert('Error al obtener los espacios.');
    });
});

// Llenar tabla del espaciosAdmin.html
function populateTable(data) {
    const tableBody = document.querySelector('#example tbody');
    tableBody.innerHTML = ''; 
    
    data.forEach(espacio => {
        const row = `
            <tr>
                <td>${espacio.nombre}</td>
                <td>${espacio.descripcion}</td>
                <td>${espacio.ubicacion}</td>
                <td>${espacio.mantenimiento}</td>
                <td>${espacio.estado}</td>
                <td>${espacio.condominio}</td>
                <td>
                    <a href="espaciosIndividualAdmin.html" class="btn btn-primary btn-sm">Ver</a>
                    <a href="#" class="btn btn-primary btn-sm">Editar</a>
                </td>
            </tr>
        `;// espacio.id_espacio
        tableBody.innerHTML += row;
    });
}

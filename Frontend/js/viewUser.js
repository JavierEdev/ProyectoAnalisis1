document.addEventListener("DOMContentLoaded", function() {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const idUser = localStorage.getItem('idRegistro');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        console.log("Usuario:", idUser); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el nombre de usuario en localStorage");
    }

    fetch('http://localhost/ProyectoAnalisis1/Backend/index.php/auth/id_usuario', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: idUser })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);
        if (data && data.length > 0) {
            llenarFormulario(data[0]);
        } else {
            console.log("No se encontraron datos del espacio.");
        }
    })
    .catch(error => console.error('Error al obtener los datos del espacio:', error));
});

function llenarFormulario(user) {
    document.getElementById('idUser').value = user.id_usuario || '';
    document.getElementById('nombre').value = user.nombre || '';
    document.getElementById('lastname').value = user.apellido || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('creado').value = user.creado_en || '';
    if (user.rol==1){
        document.getElementById('rol').value = "Administrador";
    }
    else if (user.rol==2){
        document.getElementById('rol').value = "Colaborador";
    }
    else if (user.rol==3){
        document.getElementById('rol').value = "Residente";
    }
    
    if (user.estado==1){
        document.getElementById('estado').value = "Activo";
    }else if (user.estado==2){
        document.getElementById('estado').value = "Inactivo";
    }
}
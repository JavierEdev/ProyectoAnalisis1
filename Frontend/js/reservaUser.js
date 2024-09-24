document.addEventListener("DOMContentLoaded", function() {
    const idCondo = localStorage.getItem('idCondo');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const idEspacio = localStorage.getItem('idEspacio');
    const idUser = localStorage.getItem('idUsuario');
    const nombreEspacio = localStorage.getItem('nombreEspacio');

    if (token) {
        console.log("Id_Condo:", idCondo); 
        console.log("Token:", token); 
        console.log("Espacio:", idEspacio); 
        console.log("Usuario:", idUser); 
        console.log("nombreEspacio:", nombreEspacio); 
        document.getElementById('username').textContent = userName;
        llenarPagina();
    } else {
        console.log("No se encontró el nombre de usuario en localStorage");
    }

});

function llenarPagina() {
    const nombreEspacio = localStorage.getItem('nombreEspacio');
    document.getElementById('espacio').value = nombreEspacio;
    
}
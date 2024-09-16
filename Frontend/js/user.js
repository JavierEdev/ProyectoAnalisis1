document.addEventListener("DOMContentLoaded", function() {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    if (userName) {
        console.log("Nombre de usuario:", userName); 
        console.log("Token:", token); 
        document.getElementById('username').textContent = userName;
    } else {
        console.log("No se encontró el nombre de usuario en localStorage");
    }
});
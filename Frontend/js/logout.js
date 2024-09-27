document.getElementById("logout").addEventListener("click", function(event) {
    event.preventDefault();
    if (confirm("¿Seguro que deseas cerrar sesión?")) {
        window.location.href = "../login.html";
    }
});
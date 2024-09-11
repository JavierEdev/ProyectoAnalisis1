$(document).ready(function() { 
    $("#demoEvoCalendar").on('selectDate', function() {
        // Obtener la fecha seleccionada como cadena
        var selectedDateStr = $(this).evoCalendar('getActiveDate');

        // Crear un objeto Date a partir de la cadena
        var date = new Date(selectedDateStr);

        // Asegurarnos de que el formato sea YYYY-MM-DD para el input de tipo "date"
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes de 0-11, sumamos 1
        var day = date.getDate().toString().padStart(2, '0');

        // Convertimos la fecha al formato YYYY-MM-DD
        var formattedDate = year + '-' + month + '-' + day;

        // Actualizar el campo de fecha en el formulario
        $('#fecha_reserva').val(formattedDate);
    });
});


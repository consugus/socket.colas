
// Estableciendo la comunicación con el servidor
var socket = io();

var label = $("#lblNuevoTicket")

// Interactuando con el servidor
socket.on("connect", function (){
    console.log("Conectado al servidor");
});

socket.on("disconnect", function(){
    console.log("Perdimos la conexión al servidor");
});

$("#btn-nuevoTicket").on("click", function(){
    // console.log("click en el botón");
    socket.emit("siguienteTicket", null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});

socket.on('estadoActual', function(getUltimoTicket){
    
    label.text(getUltimoTicket.actual);
});
// Estableciendo la comunicación con el servidor
var socket = io();

var labelTkt1 = $('#lblTicket1');
var labelTkt2 = $('#lblTicket2');
var labelTkt3 = $('#lblTicket3');
var labelTkt4 = $('#lblTicket4');
var labelDesk1 = $('#lblEscritorio1');
var labelDesk2 = $('#lblEscritorio2');
var labelDesk3 = $('#lblEscritorio3');
var labelDesk4 = $('#lblEscritorio4');


socket.on('connect', function () {
    console.log("Conectado con el servidor");
}); // end io.on('connect', function(){...})


socket.on('disconnect', function () {
    console.log("Se perdió la conección con el servidor");
});


socket.on('estadoActual', function (resp) {
    actualizarHtml( resp );
});


socket.on("ultimos4", function( resp ){
    // var audio = new Audio("audio/new-ticket.mp3");
    // audio.play();
    actualizarHtml(resp);
});


function actualizarHtml (resp){

    labelTkt1.text("Ticket " + resp.ultimos4[0].numero);
    labelDesk1.text("Escritorio " + resp.ultimos4[0].escritorio);

    labelTkt2.text("Ticket " + resp.ultimos4[1].numero);
    labelDesk2.text("Escritorio " + resp.ultimos4[1].escritorio);

    labelTkt3.text("Ticket " + resp.ultimos4[2].numero);
    labelDesk3.text("Escritorio " + resp.ultimos4[2].escritorio);

    labelTkt4.text("Ticket " + resp.ultimos4[3].numero);
    labelDesk4.text("Escritorio " + resp.ultimos4[3].escritorio);
};
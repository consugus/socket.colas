// Estableciendo la comunicación con el servidor
var socket = io();

var label = $("#btnAtenderTicket")

socket.on('connect', function(){
    console.log("Conectado con el servidor");
}); // end io.on('connect', function(){...})

socket.on('disconnect', function(){
    console.log("Se perdió la conección con el servidor");
});



let searchParams = new URLSearchParams( window.location.search );
// console.log("searchParams: ", searchParams);

if( !searchParams.has('escritorio') ){
    window.location("index.html");
    throw new Error("El escritorio es necesario");
};

var escritorio = searchParams.get('escritorio');

$('#numeroDeEscritorio').text(escritorio);

$('#btnAtenderTicket').on('click', function(){
    socket.emit('atenderTicket', { escritorio: escritorio }, function( resp ){
        var msg = "ticket Nº " + resp.numero;
        // console.log(msg);

        if(resp.numero === undefined){
            $('#atendiendoATicket').text( "(No hay tickets pendientes de atención)" );
        } else{
            $('#atendiendoATicket').text( msg );
        }

    });

});


const { io } = require('../server');
const{ TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    // Consulta por siguiente ticket
    client.on("siguienteTicket", (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    }); // end consulta por siguiente ticket

    //Revolver el estado actual
    client.emit('estadoActual',  {
        actual:  ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    }); // end resolver el estado actual

    client.on('atenderTicket', (data, callback) => {
        if( !data.escritorio ){
            return callback({
                ok: false,
                message: 'Es necesario especificar el escritorio'
            });
        };

        let atenderEscritorio = ticketControl.atenderTicket(data.escritorio);
        callback(atenderEscritorio);

        // actualizar/notificar los últimos4

        client.broadcast.emit("ultimos4", {
            ultimos4: ticketControl.getUltimos4()
        });


    });

}); // end io.on('connection', () => {...})
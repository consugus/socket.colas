const express = require('express');
const app = express();
let server = require('http').createServer(app);

// IO = esta es la comunicacion del backend
const io = require('socket.io')(server);

const publicPath = require('path').resolve(__dirname, '../public');
app.use(express.static(publicPath));

module.exports = { io };

require('./sockets/socket');

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);

});
const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      PORT = 8080,
      commandList = ['/help','/list','/date','/hello'];

/*
COMMANDS:
  - /help: envia todos los comandos disponibles
  - /list: numero de clientes conectados
  - /date: envia fecha
  - /hello: devuelve saludo
*/

var users = 0;

http.listen(PORT, function(){
  console.log('server in: http://127.0.0.1:' + PORT);
});

app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("access to " + path);
});

// El resto de peticiones se interpretan como ficheros estáticos
app.use('/', express.static(__dirname +'/'));

// COMUNICACION POR WEBSOCKETS
// Evento: Nueva conexion recibida
io.on('connection', function (socket){

  // Usuario conectado
  console.log('new user, socket id: ' + socket.id);
  users += 1;

  // Le damos la bienvenida a través del evento 'welcome'
  socket.emit('welcome', "Welcome, you're the user number " + users.toString());

  // Función de retrollamada de mensaje recibido del cliente
  socket.on('msg', (msg) => {
    console.log("user with socket id " + socket.id + ': ' + msg);
    // Enviar el mensaje a TODOS los clientes que estén conectados
    io.emit('msg', msg);
  });

  socket.on('cmd', (msg) => {
    console.log("user with socket id " + socket.id + ': ' + msg);
    let cmd = "";
    switch (msg) {
      case '/help':
        cmd += "'/help': show all commands <br> '/list': show number of user connected";
        cmd += "<br> '/date': show date <br> '/hello': get a greeting from server";
        break;
      case '/list':
        cmd += users.toString() + " users connected, included you";
        break;
      case '/date':
        let date = new Date();
        cmd += date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
        break;
      case '/hello':
        cmd = "Hola guapito, ¿más patatitas?"
        break;
      default:
        cmd = "No command named '" + msg + "' try with '/help' to see all commands";
    }
    // Enviar el mensaje a TODOS los clientes que estén conectados
    if (cmd) {
      socket.emit('msg', cmd);
    }
  });

  // Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
    console.log('user disconnect, socket id: ' + socket.id);
    users -= 1;
  });
});

const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      PORT = 8080;

var users = 0,
    names = {};

http.listen(PORT, () => {
  console.log('server in: http://127.0.0.1:' + PORT + '/');
});

app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log('access to ' + path);
});

app.use('/', express.static(__dirname + '/'));

io.on('connection', (socket) => {

  socket.on('hello', (msg) => {
    io.emit('msg','server: ' + msg + ' joins to the chat');
    console.log('new user, socket id: ' + socket.id + ', name: ' + msg);
    users += 1;
    names[socket.id] = msg;
    socket.emit('welcome', 'server: welcome, ' + msg + ' you\'re the user number ' + users.toString());
  });

  socket.on('msg', (msg) => {
    console.log(names[socket.id] + ': ' + msg);
    io.emit('msg', names[socket.id] + ': ' + msg);
  });

  socket.on('cmd', (msg) => {
    console.log('user with socket id ' + socket.id + ': ' + msg);
    let cmd = '';
    switch (msg) {
      case '/help':
        cmd += '\'/help\': show all commands <br> \'/list\': show number of user connected';
        cmd += '<br> \'/date\': show date <br> \'/hello\': get a greeting from server';
        break;
      case '/list':
        cmd += users.toString() + ' users connected, included you';
        break;
      case '/date':
        let date = new Date();
        cmd += date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
        break;
      case '/hello':
        cmd = 'gloria a gorzo'
        break;
      default:
        cmd = 'no command named \'' + msg + '\' try with \'/help\' to see all commands';
    }
    socket.emit('msg', 'server: ' + cmd);
  });

  socket.on('disconnect', () => {
    console.log(names[socket.id] + ' leaves the chat');
    users -= 1;
    io.emit('msg', 'server: ' + names[socket.id] + ' leaves the chat');
    delete names[socket.id];
  });
});

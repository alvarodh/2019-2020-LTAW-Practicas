const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      PORT = 8080

var users = 0,
    names = {},
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    months = ['January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December']

http.listen(PORT, () => {
  console.log('server in: http://localhost:' + PORT + '/')
})

app.get('/', (req, res) => {
  console.log('access to ' + __dirname + '/chat.html')
  res.sendFile(__dirname + '/chat.html')
})

app.use('/', express.static(__dirname + '/'))

io.on('connection', (socket) => {

  socket.on('hello', (msg) => {
    if (isAccepted(msg)) {
      console.log('new user, socket id: ' + socket.id + ', name: ' + msg)
      io.emit('msg','<strong>server</strong>: ' + msg + ' joins to the chat')
      users += 1
      names[socket.id] = msg
      socket.emit('welcome', '<strong>server</strong>: welcome, ' + msg + ' you\'re the user number ' + users.toString())
    } else {
      console.log('user ' + msg + ' not accepted, nick in use')
      socket.emit('used', 'user ' + msg + ' not accepted, nick already in use')
    }
  })

  socket.on('msg', (msg) => {
    console.log(names[socket.id] + ': ' + msg)
    io.emit('msg', '<strong>' + names[socket.id] + '</strong>: ' + msg)
  })

  socket.on('cmd', (msg) => {
    console.log(names[socket.id] + ': ' + msg)
    let cmd = ''
    switch (msg) {
      case '/help':
        cmd += 'You can use this commands:'
        cmd += '<ul><li>\'/help\': show all commands </li><li>\'/list\': show number of connected users</li>'
        cmd += '<li>\'/date\': show date </li><li>\'/hello\': get a greeting from server</li>'
        cmd += '<li>\'/user-list\': show names of connected users</li></ul>'
        break
      case '/list':
        cmd += users.toString() + ' users connected, included you'
        break
      case '/date':
        let date = new Date()
        //cmd += date.getDate() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear()
        cmd += 'Today is ' + days[date.getDay()] + ' ' + date.getDate() + ' of ' + months[date.getMonth()] + ' ' + date.getFullYear()
        break;
      case '/hello':
        cmd = 'gloria a gorzo, ' + names[socket.id]
        break
      case '/user-list':
        cmd += '<ul>'
        for (let id in names) {
          cmd += '<li>' + names[id] + '</li>'
        }
        cmd += '</ul>'
        break
      default:
        cmd = 'no command named \'' + msg + '\' try with \'/help\' to see all commands'
    }
    socket.emit('msg', '<strong>server</strong>: ' + cmd)
  })

  socket.on('disconnect', () => {
    console.log(names[socket.id] + ' leaves the chat')
    users -= 1
    io.emit('msg', '<strong>server</strong>: ' + names[socket.id] + ' leaves the chat')
    delete names[socket.id]
  })
})

function isAccepted(nickname) {
  let accepted = true
  for (let id in names) {
    if (nickname.toLowerCase() == names[id].toLowerCase()) {
      accepted = false
    }
  }
  return accepted
}

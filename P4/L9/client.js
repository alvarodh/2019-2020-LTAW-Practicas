function init () {
  $(document).ready(function () {
    $('.container').hide()
  })
}

const display = document.getElementById('display'),
      msg = document.getElementById('msg'),
      name = document.getElementById('name'),
      register = document.getElementById('register'),
      send = document.getElementById('send'),
      line = document.getElementById('line'),
      socket = io()

register.onclick = () => {
  if (name.value) {
    socket.emit('hello', name.value)
  }
}

name.onkeydown = (ev) => {
  switch (ev.keyCode) {
    case 13: // enter
      if (name.value) {
        socket.emit('hello', name.value)
      }
      break;
    default:
      //
  }
}

socket.on('used', (msg) => {
  line.innerHTML = msg
})

socket.on('welcome', (msg) => {
  $(document).ready(function () {
    $('#register-panel').hide()
    $('#line').hide()
    $('.container').show()
  })
  display.innerHTML = '> ' + msg
})

socket.on('msg', (msg) => {
  content = '> ' + msg + '<br>' + display.innerHTML
  display.innerHTML = content
})

function sendMessage() {
  if (msg.value){
    if (msg.value[0] == '/') {
      socket.emit('cmd', msg.value)
    } else {
      socket.emit('msg', msg.value)
    }
  }
  msg.value = ''
}

send.onclick = () =>{
  sendMessage()
}

msg.onkeydown = (ev) => {
  switch (ev.keyCode) {
    case 13: // enter
      sendMessage()
      break;
    default:
      //
  }
}

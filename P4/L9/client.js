function init () {
  $(document).ready(function () {
    $('.container').hide();
  });
}

const display = document.getElementById('display'),
      msg = document.getElementById('msg'),
      name = document.getElementById('name'),
      register = document.getElementById('register'),
      send = document.getElementById('send'),
      socket = io();

socket.on('welcome', (msg) => {
  console.log(msg);
  display.innerHTML = '> ' + msg;
});

socket.on('msg', (msg) => {
  display.innerHTML += '<br> > ' + msg;
});

send.onclick = () => {
  if (msg.value){
    if (msg.value[0] == '/') {
      socket.emit('cmd', msg.value);
    } else {
      socket.emit('msg', msg.value);
    }
  }
  msg.value = '';
}

register.onclick = () => {
  if (name.value) {
    socket.emit('hello', name.value);
    $(document).ready(function () {
      $('.panel').hide();
      $('.container').show();
    });
  }
}

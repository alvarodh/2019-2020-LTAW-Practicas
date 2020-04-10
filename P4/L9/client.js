// Obtener los elementos del DOM
const display = document.getElementById("display"),
      msg = document.getElementById("msg"),
      send = document.getElementById("send"),
      socket = io();

// Se ha recibido el evento 'welcome':
socket.on('welcome', (msg) => {
  // Mostrarlo en la consola del navegador, para depurar
  console.log("message receive from server: " + msg);

  // Ponerlo en el párrafo display
  display.innerHTML = msg;
});

// Se ha recibido un mensaje
socket.on('msg', (msg) => {
  // Añadirlo al párrafo display
  display.innerHTML += "<br> > " + msg;
});

// Botón de envío apretado
send.onclick = () => {
  // Usamos el nombre 'msg' para los mensajes de usuario
  // Si no se ha introducido ningún mensaje, no se envía
  if (msg.value){
    if (msg.value[0] == '/') {
      socket.emit('cmd', msg.value);
    } else {
      socket.emit('msg', msg.value);
    }
  }
  // Borramos el mensaje escrito
  msg.value = "";
}

// Puerto para recibir las peticiones
const port = 8080;

// Modulo http
const http = require('http');

console.log("Arrancando servidor...")

// Funcion para atender peticiones
// req → solicitud
// res → respuesta
function peticion(req, res) {

  // Peticion recibida
  console.log("Peticion recibida!")

  // Mensaje de respuesta
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');

}

// Inicializar el servidor
// Cada vez que recibe una petición, la atiende
const server = http.createServer(peticion)

// Configurar el servidor para escuchar en el puerto establecido
server.listen(port);

console.log("Super-Servidor LISTO!")
console.log("Escuchando en puerto: " + port)

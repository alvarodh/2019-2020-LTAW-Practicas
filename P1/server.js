// Puerto para recibir las peticiones
const port = 8080;
const http = require('http');
const fs = require('fs');

console.log('Arrancando servidor...')

// Inicializar el servidor
// Cada vez que recibe una petición, la atiende
const server = http.createServer(function (req, res) {
  // Funcion para atender peticiones
  //    req → solicitud
  //    res → respuesta

  // Buscamos en la url el recurso que se pide
  var url = req.url.slice(1).split('.')[0];

  // Miramos si tenemos ese recurso
  switch (url) {
    case '':
    case 'index':
      // Si no hay nada redirigimos a la pagina inicial
      fs.readFile('layout/index.html', 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        console.log('index.html require');
        return res.end();
      });
      break;
    case 'recurso1':
    case 'recurso2':
    case 'recurso3':
      // Si es alguno de los recursos conocidos, se le redirige
      fs.readFile('layout/' + url + '.html', 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        console.log(url + ' require');
        return res.end();
      });
      break;
    default:
      // Si no se conoce el recurso, se redirige a la página de error
      fs.readFile('layout/error.html', 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        console.log('error.html require');
        return res.end();
      });
  }
}).listen(port);

console.log('Super-Servidor LISTO!')
console.log('Escuchando en puerto: ' + port + '\n\n')

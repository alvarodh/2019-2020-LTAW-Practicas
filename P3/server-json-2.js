const http = require('http'),
      url = require('url'),
      fs = require('fs'),
      PUERTO = 8080;

let productos = ["FPGA-1", "RISC-V", "74ls00", "FPGA-2", "74ls01", "AVR", "Arduino-UNO"];

http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  console.log("Petición: " + q.pathname);
  switch (q.pathname) {
    case "/":
      fs.readFile("./index.html", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
        return
      });
      break;
    case "/client-2.js":
      fs.readFile("./client-2.js", (err, data) => {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.write(data);
        res.end();
        return
      });
      break;
      case "/myquery":
        params = q.query;
        console.log(params.producto)
        content = JSON.stringify(productos) + '\n';
        res.setHeader('Content-Type', 'application/json')
        res.write(content);
        res.end();
        return
        break
    default:
      content = "Error";
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html')
      res.write(content);
      res.end();
  }

}).listen(PUERTO);


console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)

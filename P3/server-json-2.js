///-- Modulos utilizados
const http = require('http'),
      url = require('url'),
      fs = require('fs'),
      PUERTO = 8080;

let productos = ["FPGA-1", "RISC-V", "74ls00", "FPGA-2", "74ls01", "AVR", "Arduino-UNO"];

function get_products(p) {


  return prods;
}

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  console.log("Petición: " + q.pathname);
  switch (q.pathname) {
    case "/":
      fs.readFile("./index.html", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
      break;
    //-- Fichero js cliente
    case "/client-2.js":
      fs.readFile("./client-2.js", (err, data) => {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.write(data);
        return res.end();
      });
      break;
      case "/myquery":
        const params = q.query;
        console.log("Parametros: " + params.prod);
        console.log(typeof(params.prod))
        let prod_p = []
        for (var i = 0; i < productos.length; i++) {
          if (productos[i].toLowerCase().indexOf(params.prod.toLowerCase()) != -1 && params.prod.length > 0) {
            prod_p.push(productos[i]);
          }
        }
        content = JSON.stringify(prod_p);
        res.setHeader('Content-Type', 'application/json')
        res.write(content);
        res.end();
        break;
    default:
      content = "Error";
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html')
      res.write(content);
      res.end();
  }
}).listen(PUERTO)

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)

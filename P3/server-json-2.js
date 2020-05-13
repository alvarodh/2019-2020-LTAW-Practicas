///-- Modulos utilizados
const http = require('http'),
      url = require('url'),
      fs = require('fs'),
      PUERTO = 8000;

let productos = ["croissant de mantequilla", "napolitana de 3 chocolates",
                 "donut de azucar", "donut de chocolate",
                 "palmera de chocolate", "palmera de hojaldre"];

const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true),
      cookie = req.headers.cookie,
      params = q.query;
  console.log("Petición: " + q.pathname);
  switch (q.pathname) {
    case "/":
      fs.readFile("./layout/index.html", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
      break;
    case "/register_form":
      if (req.method == "POST") {
        req.on('data', chunk => {
          data = chunk.toString();
          content = data.split('&')[0].split('=')[1] + "=[]";
          res.setHeader('Set-Cookie', content);
          return;
        });
      }
      fs.readFile("./layout/index.html", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
      break;
    case "/cart":
      for (var i = 0; i < cookie.split('; ').length; i++) {
        if (cookie.split('; ')[i].split('=')[0] == params.user) {
          content = cookie.split(';')[i].split('=')[1];
          res.setHeader('Content-Type', 'application/json')
          res.write(content);
          res.end();
        }
      }
      break;
    case "/comprar":
      if (req.method == "POST") {
        req.on('data', chunk => {
          data = chunk.toString();
          content = ""
          if (!cookie) {
            content = data.split('&')[0].split('=')[1] + '='
            content += '[\"' + data.split('&')[1].split('=')[1].replace(/[+]/gi,' ') + '\"]'
          } else {
            for (var i = 0; i < cookie.split('; ').length; i++) {
              if (cookie.split('; ')[i].split('=')[0] == data.split('&')[0].split('=')[1]) {
                content = data.split('&')[0].split('=')[1] + '='
                cart = JSON.parse(cookie.split('; ')[i].split('=')[1])
                cart.push(data.split('&')[1].split('=')[1].replace(/[+]/gi,' '))
                content += JSON.stringify(cart)
              }
            }
            if (content == "") {
              content = data.split('&')[0].split('=')[1] + '='
              content += '[\"' + data.split('=')[1].split('=')[1].replace(/[+]/gi,' ') + '\"]'
            }
          }
          if (content) {
            res.setHeader('Set-Cookie', content);
          }
          return;
        });
      }
      fs.readFile("./layout/index.html", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
      break;
    case "/client-2.js":
    case "/client-cart.js":
      fs.readFile("./static/js" + q.pathname, (err, data) => {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.write(data);
        return res.end();
      });
      break;
    case "/croissant-de-mantequilla.html":
    case "/napolitana-de-3-chocolates.html":
    case "/donut-de-chocolate.html":
    case "/donut-de-azucar.html":
    case "/palmera-de-chocolate.html":
    case "/palmera-de-hojaldre.html":
    case "/register.html":
      fs.readFile("./layout" + q.pathname, (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
      break;
    case "/myquery":
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
    case "/croissant-mantequilla.jpg":
    case "/napolitana-3-chocolates.jpg":
    case "/donuts-chocolate.jpg":
    case "/donuts-azucar.jpg":
    case "/palmera-chocolate.jpg":
    case "/palmera-hojaldre.jpg":
    case "/index.jpg":
    case "/favicon.ico":
      fs.readFile("./static/image" + q.pathname, (err, data) => {
        ext = q.pathname.split('.')[1]
        res.writeHead(200, {'Content-Type': 'image/' + ext});
        res.write(data);
        return res.end();
      });
      break;
    case '/show_cart':
      fs.readFile("./layout/cart.html", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
      break;
    case '/master.css':
      fs.readFile("./static/css" + q.pathname, (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        return res.end();
      });
      break;
    case '/ARCHER.TTF':
      fs.readFile("./static/css" + q.pathname, (err, data) => {
        res.writeHead(200, {'Content-Type': 'font/ttf'});
        res.write(data);
        return res.end();
      });
      break;
    default:
      content = "Error";
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html')
      res.write(content);
      res.end();
      break;
  }
}).listen(PUERTO)

console.log("Servidor en: http://localhost:" + PUERTO + "/")

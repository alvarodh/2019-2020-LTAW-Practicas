///-- Modulos utilizados
const http = require('http'),
      url = require('url'),
      fs = require('fs'),
      PUERTO = 8000

// BASES DE DATOS, A LO CUTRE
let productos = {"croissant de mantequilla": 0.29,
                 "napolitana de 3 chocolates": 1.00,
                 "donut de azucar": 0.25,
                 "donut de chocolate": 0.25,
                 "palmera de chocolate": 1.69,
                 "palmera de hojaldre": 2.25},
    user_template = {"password": "",
                     "cart":{
                       "croissant de mantequilla": 0,
                       "napolitana de 3 chocolates": 0,
                       "donut de azucar": 0,
                       "donut de chocolate": 0,
                       "palmera de chocolate": 0,
                       "palmera de hojaldre": 0,
                       "total": 0.0}
                     }

const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true),
      cookie = req.headers.cookie,
      params = q.query,
      filename = "",
      mime = ""

  switch (q.pathname) {
    case "/":
      filename = "./layout/index.html"
      mime = 'text/html'
      code = 200
      break
    case "/register_form":
      if (req.method == "POST") {
        req.on('data', chunk => {
          data = chunk.toString()
          console.log(data)
          let new_user = true,
              cname = "",
              name = data.split('&')[0].split('=')[1]
          if (cookie) {
            for (var i = 0; i < cookie.split('; ').length; i++) {
              cname = cookie.split('; ')[i].split('=')[0]
              if (cname == name) {
                new_user = false
                break
              }
            }
          }
          if (new_user) {
            user = user_template
            user.password = data.split('&')[1].split('=')[1]
            res.setHeader('Set-Cookie', name + "=" + JSON.stringify(user))
          }
          return
        })
      }
      registered = true
      filename = "./layout/index.html"
      mime = 'text/html'
      code = 200
      break
    case "/cart": // PETICION GET: http://localhost:PORT/cart?user=NOMBRE
      let cname = ""
      for (var i = 0; i < cookie.split('; ').length; i++) {
        cname = cookie.split('; ')[i].split('=')[0]
        if (cname == params.user) {
          cart = JSON.parse(cookie.split(';')[i].split('=')[1])
          content = JSON.stringify(cart.cart)
          res.setHeader('Content-Type', 'application/json')
          res.write(content)
          res.end()
        }
      }
      break
    case "/pay":
      if (req.method == "POST") {
        req.on('data', chunk => {
          data = chunk.toString()
          let cname = "",
              name = data.split('&')[0].split('=')[1],
              password = data.split('&')[1].split('=')[1]
          for (var i = 0; i < cookie.split('; ').length; i++) {
            cname = cookie.split('; ')[i].split('=')[0]
            if (cname == name) {
              user = JSON.parse(cookie.split('; ')[i].split('=')[1])
              if (password == user.password) {
                user.cart = user_template.cart
                res.setHeader('Set-Cookie', name + "=" + JSON.stringify(user))
                filename = "./layout/comprao.html"
              } else {
                filename = "./layout/error.html"
              }
            }
          }
          fs.readFile(filename, (err, data) => {
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'})
              res.write("<h1>Error 404: File not Found</h1>")
              return res.end()
            } else {
              res.writeHead(200, {'Content-Type': 'text/html'})
              res.write(data)
              return res.end()
            }
          })
          return
        })
      }
      break
    case "/buy":
      if (req.method == "POST") {
        req.on('data', chunk => {
          let data = chunk.toString(),
              content = "",
              cname = "",
              name = data.split('&')[0].split('=')[1],
              prod = data.split('&')[1].split('=')[1].replace(/[+]/gi,' ')
          if (cookie) {
            for (var i = 0; i < cookie.split('; ').length; i++) {
              cname = cookie.split('; ')[i].split('=')[0]
              if (cname == name) {
                content = name + '='
                let cart = JSON.parse(cookie.split('; ')[i].split('=')[1])
                cart.cart[prod] += 1
                cart.cart.total = Math.round((cart.cart.total + productos[prod])*100)/100
                content += JSON.stringify(cart)
              }
            }
          }
          if (content) {
            res.setHeader('Set-Cookie', content)
            filename = "./layout/index.html"
          } else {
            filename = "./layout/register.html"
          }
          fs.readFile(filename, (err, data) => {
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'})
              res.write("<h1>Error 404: File not Found</h1>")
              return res.end()
            } else {
              res.writeHead(200, {'Content-Type': 'text/html'})
              res.write(data)
              return res.end()
            }
          })
          return
        })
      }
      break
    case "/client-2.js":
    case "/client-cart.js":
    case "/jquery.min.js":
      filename = "./static/js" + q.pathname
      mime = 'application/javascript'
      code = 200
      break;
    case "/croissant-de-mantequilla.html":
    case "/napolitana-de-3-chocolates.html":
    case "/donut-de-chocolate.html":
    case "/donut-de-azucar.html":
    case "/palmera-de-chocolate.html":
    case "/palmera-de-hojaldre.html":
    case "/register.html":
      filename = "./layout" + q.pathname
      mime = 'text/html'
      code = 200
      break
    case "/searchbar": // PETICION GET: http://localhost:PORT/searchbar?prod=PRODUCTO
      let prod_p = []
      for (let prod in productos) {
        if (prod.toLowerCase().indexOf(params.prod.toLowerCase()) != -1 && params.prod.length > 0) {
          prod_p.push(prod)
        }
      }
      content = JSON.stringify(prod_p);
      res.setHeader('Content-Type', 'application/json')
      res.write(content)
      res.end()
      break;
    case "/croissant-mantequilla.jpg":
    case "/napolitana-3-chocolates.jpg":
    case "/donuts-chocolate.jpg":
    case "/donuts-azucar.jpg":
    case "/palmera-chocolate.jpg":
    case "/palmera-hojaldre.jpg":
    case "/index.jpg":
    case "/favicon.ico":
      filename = "./static/image" + q.pathname
      mime = 'image/' + q.pathname.split('.')[1]
      code = 200
      break;
    case '/show_cart':
      filename = "./layout/cart.html"
      mime = 'text/html'
      code = 200
      break;
    case '/master.css':
      filename = "./static/css" + q.pathname
      mime = 'text/css'
      code = 200
      break;
    case '/ARCHER.TTF':
      filename = "./static/css" + q.pathname
      mime = 'font/ttf'
      code = 200
      break;
    default:
      //
  }
  console.log("petition: " + q.pathname)
  if (q.pathname != "/cart" && q.pathname != "/searchbar" && q.pathname != "/buy" && q.pathname != "/pay") {
    console.log("filename: " + filename)
    console.log("mime: " + mime + '\n\n')
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write("<h1>Error 404: File not Found</h1>")
        return res.end()
      } else {
        res.writeHead(code, {'Content-Type': mime})
        res.write(data)
        return res.end()
      }
    })
  }
}).listen(PUERTO)

console.log("Servidor en: http://localhost:" + PUERTO + "/")

// Modulos utilizados
const http = require('http'),
      url = require('url'),
      fs = require('fs'),
      PUERTO = 8000

// BASES DE DATOS, A LO CUTRE
    // productos y precios
let productos = {'croissant de mantequilla': 0.29,
                 'napolitana de 3 chocolates': 1.00,
                 'donut de azucar': 0.25,
                 'donut de chocolate': 0.25,
                 'palmera de chocolate': 1.69,
                 'palmera de hojaldre': 2.25,
                 'croissant franckfurt': 0.96,
                 'flautas crema': 0.36,
                 'donuts rellenos': 0.71,
                 'rosquillas san isidro fantasia': 0.92,
                 'rosquillas san isidro limon': 0.92,
                 'rosquillas san isidro santa clara': 0.92,},
    // ejemplo de cookie vacia
    user_template = {'password': '',
                     'cart':{
                       'croissant de mantequilla': 0,
                       'napolitana de 3 chocolates': 0,
                       'donut de azucar': 0,
                       'donut de chocolate': 0,
                       'palmera de chocolate': 0,
                       'palmera de hojaldre': 0,
                       'croissant franckfurt': 0,
                       'flautas crema': 0,
                       'donuts rellenos': 0,
                       'rosquillas san isidro fantasia': 0,
                       'rosquillas san isidro limon': 0,
                       'rosquillas san isidro santa clara': 0,
                       'total': 0.0}
                     }

const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true),
      cookie = req.headers.cookie,
      params = q.query,
      filename = '',
      mime = '',
      ext = '',
      prod_search = [],
      prod_show = []

  if (q.pathname != '/') {
    ext = q.pathname.split('.')[q.pathname.split('.').length - 1].toLowerCase()
  }

  switch (ext) {
    case '':
      filename = './layout/index.html'
      mime = 'text/html'
      code = 200
      break
    case 'register_form':
      if (req.method == 'POST') {
        req.on('data', chunk => {
          data = chunk.toString()
          console.log(data)
          let new_user = true,
              cname = '',
              name = data.split('&')[0].split('=')[1]
          if (cookie) {
            // si existen cookies anteriores comprobamos si el usuario ya esta
            // registrado
            for (var i = 0; i < cookie.split('; ').length; i++) {
              cname = cookie.split('; ')[i].split('=')[0]
              if (cname == name) {
                new_user = false
                break
              }
            }
          }
          if (new_user) {
            // si el usuario no estaba registrado, se le crea una nueva cookie
            user = user_template
            user.password = data.split('&')[1].split('=')[1]
            res.setHeader('Set-Cookie', name + '=' + JSON.stringify(user))
          }
          return
        })
      }
      filename = './layout/index.html'
      mime = 'text/html'
      break
    case 'cart': // PETICION GET: http://localhost:PORT/action.cart?user=NOMBRE
      let cname = '',
          sent = false
      for (var i = 0; i < cookie.split('; ').length; i++) {
        cname = cookie.split('; ')[i].split('=')[0]
        if (cname == params.user) {
          cart = JSON.parse(cookie.split(';')[i].split('=')[1])
          content = JSON.stringify(cart.cart)
          sent = true
        }
      }
      if (!sent) {
        content = ''
      }
      res.setHeader('Content-Type', 'application/json')
      res.write(content)
      res.end()
      break
    case 'pay':
      if (req.method == 'POST') {
        req.on('data', chunk => {
          data = chunk.toString()
          let cname = '',
              name = data.split('&')[0].split('=')[1],
              password = data.split('&')[1].split('=')[1]
          for (var i = 0; i < cookie.split('; ').length; i++) {
            cname = cookie.split('; ')[i].split('=')[0]
            if (cname == name) {
              user = JSON.parse(cookie.split('; ')[i].split('=')[1])
              if (password == user.password) {
                user.cart = user_template.cart
                res.setHeader('Set-Cookie', name + '=' + JSON.stringify(user))
                filename = './layout/comprao.html'
              } else {
                filename = './layout/error.html'
              }
            }
          }
          fs.readFile(filename, (err, data) => {
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'})
              res.write('<h1>Error 404: File not Found</h1>')
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
    case 'buy':
      if (req.method == 'POST') {
        req.on('data', chunk => {
          let data = chunk.toString(),
              content = '',
              cname = '',
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
            filename = './layout/index.html'
          } else {
            filename = './layout/register.html'
          }
          fs.readFile(filename, (err, data) => {
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'})
              res.write('<h1>Error 404: File not Found</h1>')
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
    case 'js':
      filename = './static/js' + q.pathname
      mime = 'application/javascript'
      break;
    case 'html':
      filename = './layout' + q.pathname
      mime = 'text/html'
      break
    case 'searchbar': // PETICION GET: http://localhost:PORT/action.searchbar?prod=PRODUCTO
    case 'showsearch': // PETICION GET: http://localhost:PORT/action.showsearch?prod=PRODUCTO
      for (let prod in productos) {
        if (params.prod.length > 0) {
          if (prod.toLowerCase().indexOf(params.prod.toLowerCase()) == -1) {
            prod_show.push(prod)
          } else {
            prod_search.push(prod)
          }
        }
      }
      content = (ext == 'showsearch') ? JSON.stringify(prod_show) : JSON.stringify(prod_search)
      res.setHeader('Content-Type', 'application/json')
      res.write(content)
      res.end()
      break
    case 'jpg':
    case 'png':
    case 'ico':
      filename = './static/image' + q.pathname
      mime = 'image/' + ext
      break;
    case 'show_cart':
      filename = './layout/cart.html'
      mime = 'text/html'
      break;
    case 'css':
      filename = './static/css' + q.pathname
      mime = 'text/css'
      break;
    case 'ttf':
      filename = './static/css' + q.pathname
      mime = 'font/ttf'
      break;
    default:
      //
  }
  console.log('request: ' + q.pathname + '\n\n')
  if (q.pathname.toLowerCase().indexOf('action.') == -1 || q.pathname.toLowerCase().indexOf('show_cart') != -1 || q.pathname.toLowerCase().indexOf('register_form') != -1) {
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write('<h1>Error 404: File not Found</h1>')
        return res.end()
      } else {
        res.writeHead(200, {'Content-Type': mime})
        res.write(data)
        return res.end()
      }
    })
  }
}).listen(PUERTO)

console.log('Servidor en: http://localhost:' + PUERTO + '/')

// IP: 212.128.255.136
// IP de ordenador de primera fila esquina

const http = require('http'),
      url = require('url');
      fs = require('fs'),
      port = 8080;

console.log('Starting server...');

http.createServer((req, res) => {
  const cookie = req.headers.cookie;
  let q = url.parse(req.url, true),
      filename = '',
      data = '';
  if (q.pathname == '/') {
    filename = 'layout/index.html'
  } else if (q.pathname == '/register_form') {
    document.getElementById('img-user');
    if (req.method == 'POST') {
      req.on('data', chunk => {
        data = chunk.toString();
        if (!cookie) {
          cookie_content = 'user=';
          for (var i = 0; i < data.split('&').length; i++) {
            cookie_content += data.split('&')[i].split('=')[1] + '&';
          }
          cookie_content += '[]';
          res.setHeader('Set-Cookie', cookie_content);
        } else {
          if (cookie.split('=')[1].split('&')[0] != data.split('&')[0].split('=')[1]) {
            cookie_content = 'user=';
            for (var i = 0; i < data.split('&').length; i++) {
              cookie_content += data.split('&')[i].split('=')[1] + '&';
            }
            cookie_content += '[]';
            res.setHeader('Set-Cookie', cookie_content);
          }
        }
        return;
      });
      filename = 'layout/index.html'
    }
  } else {
    filename = q.pathname.substr(1);
  }
  let extension = filename.split('.')[1].toLowerCase(),
      code = 200,
      mime = 'text/html';
  //console.log('required: ' + filename)
  switch (extension) {
    case 'png':
    case 'jpg':
    case 'ico':
      mime = 'image/' + extension;
      break;
    case 'css':
    case 'html':
      mime = 'text/' + extension;
      break;
    case 'json':
      mime = 'application/' + extension;
      break;
    case 'ttf':
      mime = 'font/' + extension;
      break;
    default:
      code = 404;
      filename = 'layout/error.html';
  }
  fs.readFile(filename, (err, data) => {
    if (err){
      res.writeHead(404, {'Content-Type': 'text/html'})
      return res.end('SUPER-ERROR: file not found');
    }
    res.writeHead(code, {'Content-Type': mime});
    res.write(data);
    return res.end();
  });
}).listen(port);

console.log('Port: ' + port);
console.log('Index URL: http://localhost:' + port + '/\n\n')

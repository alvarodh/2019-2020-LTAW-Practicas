const http = require('http'),
      fs = require('fs'),
      port = 8080,
      recursos = [
                  {
                    url:'/',
                    pathname:'layout/index.html',
                    mime:'text/html'
                  },
                  {
                    url:'/recurso1',
                    pathname:'layout/recurso1.html',
                    mime:'text/html'
                  },
                  {
                    url:'/recurso2',
                    pathname:'layout/recurso2.html',
                    mime:'text/html'
                  },
                  {
                    url:'/recurso2',
                    pathname:'layout/recurso2.html',
                    mime:'text/html'
                  },
                  {
                    url:'/recurso3',
                    pathname:'layout/recurso3.html',
                    mime:'text/html'
                  },
                  {
                    url:'/recurso4',
                    pathname:'layout/recurso4.html',
                    mime:'text/html'
                  },
                  {
                    url:'/recurso5',
                    pathname:'layout/recurso5.html',
                    mime:'text/html'
                  },
                  {
                    url:'/recurso6',
                    pathname:'layout/recurso6.html',
                    mime:'text/html'
                  },
                  {
                    url:'/imagen',
                    pathname:'static/image/index.jpg',
                    mime:'image/jpg'
                  },
                  {
                    url:'/imagen1',
                    pathname:'static/image/recurso1.jpg',
                    mime:'image/jpg'
                  },
                  {
                    url:'/imagen2',
                    pathname:'static/image/recurso2.jpg',
                    mime:'image/jpg'
                  },
                  {
                    url:'/imagen3',
                    pathname:'static/image/recurso3.jpg',
                    mime:'image/jpg'
                  },
                  {
                    url:'/imagen4',
                    pathname:'static/image/recurso4.jpg',
                    mime:'image/jpg'
                  },
                  {
                    url:'/imagen4',
                    pathname:'static/image/recurso5.jpg',
                    mime:'image/jpg'
                  },
                  {
                    url:'/imagen5',
                    pathname:'static/image/recurso5.jpg',
                    mime:'image/jpg'
                  },
                  {
                    url:'/imagen6',
                    pathname:'static/image/recurso6.jpg',
                    mime:'image/jpg'
                  },
                  {
                    url:'/style',
                    pathname:'static/css/index.css',
                    mime:'text/css'
                  },
                  {
                    url:'/style1',
                    pathname:'static/css/recurso1.css',
                    mime:'text/css'
                  },
                  {
                    url:'/style2',
                    pathname:'static/css/recurso2.css',
                    mime:'text/css'
                  },
                  {
                    url:'/style3',
                    pathname:'static/css/recurso3.css',
                    mime:'text/css'
                  },
                  {
                    url:'/style4',
                    pathname:'static/css/recurso4.css',
                    mime:'text/css'
                  },
                  {
                    url:'/style5',
                    pathname:'static/css/recurso5.css',
                    mime:'text/css'
                  },
                  {
                    url:'/style6',
                    pathname:'static/css/recurso6.css',
                    mime:'text/css'
                  },
                  {
                    url:'/mainjs',
                    pathname:'static/js/main.js',
                    mime:'text/javascript'
                  }
                ];

console.log('Starting server...');

server = http.createServer((req,res) => {
  var url = req.url,
      code = 404,
      path = 'layout/error.html',
      mime = 'text/html';
  console.log('required: ' + url)
  for (var i = 0; i < recursos.length; i++) {
    if (url == recursos[i].url){
      code = 200;
      path = recursos[i].pathname;
      mime = recursos[i].mime;
      break;
    }
  }
  fs.readFile(path,(err,data) => {
    if (err){
      return res.end('SUPER-ERROR: file not found');
    }
    res.writeHead(code,{'Content-Type':mime});
    res.write(data);
    return res.end();
  });
}).listen(port);

console.log('Port: ' + port);
console.log('Index URL: http://localhost:' + port + '/\n\n')

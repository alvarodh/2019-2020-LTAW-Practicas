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
                  }
                ];

console.log('Starting server...');

server = http.createServer((req, res) => {
  var url = req.url;
  console.log('required: ' + url)
  for (var i = 0; i < recursos.length; i++) {
    if (url == recursos[i].url){
      break;
    }
  }
  if (i < recursos.length){
    console.log('200 OK')
    fs.readFile(recursos[i].pathname,(err,data) => {
      res.writeHead(200, {'Content-Type':recursos[i].mime});
      res.write(data);
      return res.end();
    });
  } else {
    console.log('404 file not found')
    fs.readFile('layout/error.html','utf-8',(err,data) => {
      res.writeHead(404, {'Content-Type':'text/html'});
      res.write(data);
      return res.end();
    });
  }
}).listen(port);

console.log('Port: ' + port);
console.log('Index URL: http://localhost:8080/')

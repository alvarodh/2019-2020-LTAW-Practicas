const ver = document.getElementById('ver'),
      resultado = document.getElementById('resultado'),
      PORT = 8000

ver.onkeyup = () => {
  if (ver.value.length >= 3) {
    const m = new XMLHttpRequest()
    m.onreadystatechange = function() {
       if (m.readyState == 4 && m.status == 200) {
         let productos = JSON.parse(m.responseText)
         resultado.innerHTML = ""
         for (let i = 0; i < productos.length; i++) {
           resultado.innerHTML += "<a href=\"" + productos[i].replace(/[ ]/gi,'-')
           resultado.innerHTML += ".html\"><li class=\"list-group-item\">" + productos[i] + "</li></a>"
         }
       }
     }
     m.open("GET","http://localhost:" + PORT.toString() + "/searchbar?prod=" + ver.value, true)
     m.send()
  } else {
    resultado.innerHTML = ""
  }
}

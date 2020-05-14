const ver = document.getElementById('ver'),
      resultado = document.getElementById('resultado');

ver.onkeyup = () => {
  if (ver.value.length >= 3) {
    const m = new XMLHttpRequest();
    m.onreadystatechange = function() {
       if (m.readyState == 4 && m.status == 200) {
         let productos = JSON.parse(m.responseText);
         resultado.innerHTML = "";
         for (let i = 0; i < productos.length; i++) {
           resultado.innerHTML += "<a href=\"" + productos[i].replace(/[ ]/gi,'-') + ".html\"><li class=\"list-group-item\">" + productos[i] + "</li></a>";
         }
       }
     }
     m.open("GET","http://localhost:8000/myquery?prod=" + ver.value, true);
     m.send();
  } else {
    resultado.innerHTML = "";
  }
}

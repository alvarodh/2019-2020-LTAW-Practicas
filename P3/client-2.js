const ver = document.getElementById('ver');
const resultado = document.getElementById('resultado');

ver.onkeyup = () => {
  const m = new XMLHttpRequest();
  m.onreadystatechange = function() {
     if (m.readyState == 4 && m.status == 200) {
       let productos = JSON.parse(m.responseText);
       resultado.innerHTML = "";
       for (let i = 0; i < productos.length; i++) {
         console.log('kjsdvbjaf')
         resultado.innerHTML += "<a class=\"list-group-item\" href=\"" + productos[i].replace(/[ ]/gi,'-') + ".html\">" + productos[i] + "</a>";
       }
     }
   }
   m.open("GET","http://localhost:8000/myquery?prod=" + ver.value, true);
   m.send();
}

function get_path(name) {
  path = ""
  for (var i = 0; i < name.split().length; i++) {
    console.log(name.split()[i])
  }
  return path;
}

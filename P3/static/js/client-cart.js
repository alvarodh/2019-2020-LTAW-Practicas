const carrito = document.getElementById('carrito');
const name = document.getElementById('name');
const button = document.getElementById('show');

show.onclick = () => {
  const m = new XMLHttpRequest();
  m.onreadystatechange = function() {
     if (m.readyState == 4 && m.status == 200) {
       let productos = JSON.parse(m.responseText);
       carrito.innerHTML = "";
       for (let i = 0; i < productos.length; i++) {
         carrito.innerHTML += productos[i];
         if (i < productos.length-1) {
           carrito.innerHTML += ', ';
         }
       }
     }
   }
   m.open("GET","http://localhost:8000/cart?user=" + name.value, true);
   m.send();
}

function get_path(name) {
  path = ""
  for (var i = 0; i < name.split().length; i++) {
    console.log(name.split()[i])
  }
  return path;
}

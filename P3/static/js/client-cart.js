const cart = document.getElementById('cart'),
      name = document.getElementById('name'),
      button = document.getElementById('show'),
      ver = document.getElementById('ver'),
      resultado = document.getElementById('resultado'),
      PORT = 8000

function init() {
  $(document).ready(function () {
    $('.container-prod').hide()
    $('.pay-form').hide()
    $('#factura').hide()
    $('.container-cart').show()
  });
}

show.onclick = () => {
  const m = new XMLHttpRequest();
  cart.innerHTML = ""
  m.onreadystatechange = function() {
     if (m.readyState == 4 && m.status == 200) {
       let productos = JSON.parse(m.responseText)
       $(document).ready(function () {
         $('.pay-form').show()
         $('#factura').show()
         $('.container-cart').show()
       });
       cart.innerHTML = ""
       for (let i in productos) {
           if (i != "total") {
             if (productos[i] > 0) {
               cart.innerHTML += i + " x" + productos[i].toString() + " unidad/es<br>"
             }
           } else {
             cart.innerHTML += "<br>" + i + ": " + productos[i].toString() + " €"
           }
       }
     }
   }
   m.open("GET","http://localhost:" + PORT.toString() + "/action.cart?user=" + name.value, true)
   m.send()
}

ver.onkeyup = () => {
  if (ver.value.length >= 3) {
    const m = new XMLHttpRequest();
    m.onreadystatechange = function() {
       if (m.readyState == 4 && m.status == 200) {
         let productos = JSON.parse(m.responseText);
         resultado.innerHTML = "";
         for (let i = 0; i < productos.length; i++) {
           resultado.innerHTML += "<li class=\"list-group-item\">" + productos[i] + "</li>"
         }
       }
     }
     m.open("GET","http://localhost:" + PORT.toString() + "/action.searchbar?prod=" + ver.value, true);
     m.send();
  } else {
    resultado.innerHTML = "";
  }
}

ver.onkeydown = (ev) => {
  switch (ev.keyCode) {
    case 13: // enter
      if (ver.value.length >= 3) {
        const m = new XMLHttpRequest()
        m.open("GET","http://localhost:" + PORT.toString() + "/action.showsearch?prod=" + ver.value, true)
        m.send()
        ver.value = ""
        m.onreadystatechange = function() {
           if (m.readyState == 4 && m.status == 200) {
             let productos = JSON.parse(m.responseText)
             $(document).ready(function () {
               $('.container-prod').show()
               $('.container-cart').hide()
               $('.producto').show();
             });
             resultado.innerHTML = ""
             $(document).ready(function () {
               for (let i = 0; i < productos.length; i++) {
                 $('#' + productos[i].replace(/[ ]/gi,'-')).hide();
               }
             });
           }
         }
      }
      break;
    default:
      //
  }
}

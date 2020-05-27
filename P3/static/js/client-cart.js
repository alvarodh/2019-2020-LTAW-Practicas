const cart = document.getElementById('cart'),
      name = document.getElementById('name'),
      button = document.getElementById('show'),
      visa = document.getElementById('tarjeta'),
      paypal = document.getElementById('paypal'),
      trans = document.getElementById('trans'),
      paydata = document.getElementById('pay-data'),
      ver = document.getElementById('ver'),
      resultado = document.getElementById('resultado'),
      notregistered = document.getElementById('not-registered'),
      PORT = 8000

function init() {
  $(document).ready(function () {
    $('.container-prod').hide()
    $('.pay-form').hide()
    $('#factura').hide()
    $('.container-cart').show()
    $('#not-registered').hide()
  })
}

visa.onclick = () => {
  paydata.innerHTML = "<label>Nombre del titular: </label> \
                      <input type=\"text\" name=\"name\" value=\"\" autocomplete=\"off\" required/><br> \
                      <label>Apellido del titular: </label> \
                      <input type=\"text\" name=\"last-name\" value=\"\" autocomplete=\"off\" required/><br> \
                      <label>Numero de tarjeta: </label> \
                      <input type=\"text\" name=\"card-num\" value=\"\" autocomplete=\"off\" required/><br> \
                      <label>Fecha de caducidad: </label> \
                      <input type=\"date\" name=\"expires-date\" value=\"\" autocomplete=\"off\" required/><br> \
                      <label>Numero de firma: </label> \
                      <input type=\"password\" name=\"firma\" value=\"\" autocomplete=\"off\" required/><br> \
                      <input type=\"submit\" value=\"Pagar\"/>"
}

paypal.onclick = () => {
  paydata.innerHTML = "<label>Correo: </label> \
                      <input type=\"email\" name=\"email\" value=\"\" autocomplete=\"off\" required/><br> \
                      <label>Contraseña: </label> \
                      <input type=\"password\" name=\"email-pwd\" value=\"\" autocomplete=\"off\" required/><br> \
                      <input type=\"submit\" value=\"Pagar\"/>"
}

trans.onclick = () => {
  paydata.innerHTML = "<label>Nombre del titular: </label> \
                      <input type=\"text\" name=\"name\" value=\"\" autocomplete=\"off\" required/><br> \
                      <label>Apellido del titular: </label> \
                      <input type=\"text\" name=\"last-name\" value=\"\" autocomplete=\"off\" required/><br> \
                      <label>Numero de cuenta: </label> \
                      <input type=\"text\" name=\"card-num\" value=\"\" autocomplete=\"off\" required/><br> \
                      <label>PIN: </label> \
                      <input type=\"password\" name=\"PIN\" value=\"\" autocomplete=\"off\" required/><br> \
                      <input type=\"submit\" value=\"Pagar\"/>"
}


show.onclick = () => {
  const m = new XMLHttpRequest();
  m.onreadystatechange = function() {
     if (m.readyState == 4 && m.status == 200) {
       if (m.responseText) {
         let productos = JSON.parse(m.responseText)
         $(document).ready(function () {
           $('#factura').show()
           $('.container-cart').show()
           $('.pay-form').show()
           $('#not-registered').hide()
         })
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
       } else {
         $(document).ready(function () {
           $('#factura').hide()
           $('.pay-form').hide()
           $('#not-registered').show()
         })
         notregistered.innerHTML = "El usuario " + name.value + " no está registrado, si desea registrarse, <a href=\"/register.html\">pulse aquí</a>."
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
         resultado.innerHTML = ""
         for (let i = 0; i < productos.length; i++) {
           resultado.innerHTML += "<li class=\"list-group-item\">" + productos[i] + "</li>"
         }
       }
     }
     m.open("GET","http://localhost:" + PORT.toString() + "/action.searchbar?prod=" + ver.value, true);
     m.send();
  } else {
    resultado.innerHTML = ""
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
               $('.producto').show()
             });
             resultado.innerHTML = ""
             $(document).ready(function () {
               for (let i = 0; i < productos.length; i++) {
                 $('#' + productos[i].replace(/[ ]/gi,'-')).hide()
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

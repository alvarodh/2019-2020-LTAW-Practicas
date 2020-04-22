const ver = document.getElementById('ver'),
      resultado = document.getElementById('resultado');

ver.onkeyup = () =>{
  console.log(ver.value)
  const m = new XMLHttpRequest();
  m.open("GET","http://localhost:8080/myquery?producto=" + ver.value, true);
  console.log(ver)
  m.onreadystatechange = function(){
     if (m.readyState == 4 && m.status == 200){
       let productos = JSON.parse(m.responseText)
       resultado.innerHTML = "";
       for (let i=0; i < productos.length; i++) {
         resultado.innerHTML += productos[i];
         if (i < productos.length-1) {
           resultado.innerHTML += ', ';
         }
       }
     }
   }
   m.send();
}

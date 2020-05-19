# Práctica 2

Se trata de un servidor web de una tienda, en este caso se ha utilizado django,
la versión 2.2.10.

Django es un framework de python que utilizaremos para crear servidores web de
una manera sencilla y eficiente.

En este caso tenemos un servidor más complejo, en el que podemos, tanto comprar
como únicamente visitar la página observando los productos.

Para el diseño web se ha utilizado Bootstrap, para la barra de navegación.

Para ejecutar el servidor:

  1. python3 manage.py runserver

  2. python3 manage.py runserver 0.0.0.0:PUERTO

Si lo ejecutamos de la primera manera, podremos acceder a nuestra web en la
siguiente url:

  http://127.0.0.1:8000/mi_tienda/

Si lo hemos ejecutado de la segunda manera, podremos buscar la ip de nuestra
máquina desde la terminal con la orden ifconfig, y acceder a la web desde
cualquier otra máquina conectada a la misma red, la url sería:

  http://IP:PUERTO/mi_tienda/

Siendo IP la ip de nuestra máquina, y PUERTO el puerto con el que hayamos
ejecutado.

En la esquina superior derecha tenemos una barra de búsqueda en la que podemos
buscar productos dentro de todos los que tenemos, tras escribirlo al pulsar en
search en nuestra interfaz veremos como nos aparecen únicamente los productos
que se asemejan o que contienen lo que estemos buscando.

También podemos comprar, para ello, si no estamos registrados, tras un primer
intento de compra nos pedirá que nos registremos, pidiendo usuario y contraseña.
Una vez nos hayamos registrado, podremos comprar todos los productos que
queramos, siempre y cuando haya stock.

Una vez hayamos terminado de escoger todo lo que nos queramos llevar a casa,
podremos ir a visualizar nuestra compra, en el desplegable de opciones,
pulsamos el apartado Consultar Carrito, introducimos usuario y contraseña y se
nos mostrará una factura, así como una pequeña caja para poder pagar, en la que
nos pedirán de nuevo usuario y contraseña, así como los datos de la tarjeta de
crédito. Una vez pulsemos en pagar, si el usuario y contraseña son correctas,
el pedido ya se habrá pagado, por tanto, si se vuelve a consultar la compra,
no tendremos nada en el carrito.

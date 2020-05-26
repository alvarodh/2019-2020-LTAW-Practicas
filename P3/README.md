# Práctica 3

Se trata de un servidor web de una tienda, construida con nodejs, el fichero
principal se encuentra en server.js.

Este servidor guardará los datos de las compras y de los usuarios, usando
cookies, además la barra de búsqueda mostrará a la derecha los productos que
se asemejen a lo que se busca.

Para ejecutar el servidor:

  1. Usando npm: npm start

  2. Directamente con node: node server.js

Tras lanzar el servidor podemos acceder al chat desde la siguiete url:

  http://127.0.0.1:8000/

La interfaz de la web es algo más compleja que la de la Práctica 1, ya que se
basa en la interfaz de la Práctica 2.

La funcionalidad es la misma que la de la Práctica 2, desde ejercer las compras
hasta pagar y consultar la compra, con la excepción de que en ésta se puede
escoger la forma de pago entre tres posibilidades:

  1. Visa

  2. Pay-Pal

  3. Transferencia bancaria

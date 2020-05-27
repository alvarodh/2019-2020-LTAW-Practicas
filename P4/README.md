# Práctica 4

Se trata de un servidor de un chat, está construido con nodejs.

En esta práctica utilizaremos express y sockets, para comunicar al cliente con
el servidor y viceversa.

Para ejecutar:

  1. Usando npm: npm start

  2. Directamente con node: node server.js

Tras lanzar el servidor podemos acceder al chat desde la siguiete url:

  http://127.0.0.1:8080/

Al entrar nos pedirá un nick para entrar en el chat, al enviarlo entraremos en
la sala, recibiremos un mensaje del servidor en el que nos indica cuántos
usuarios hay en ese momento. El usuario podrá realizar peticiones al servidor
con información varia, estas peticiones vendrán precedidas de / seguidas de un
comando, los comandos aceptados son:

  1. /help: el servidor envía todos los comandos disponibles.

  2. /list: el servidor responde con el número de usuarios conectados.

  3. /date: el servidor envía la fecha.

  4. /hello: el servidor responde con un saludo personalizado.

  5. /user-list: el servidor responde con los nombres de los usuarios conectados.

En el caso de que el comando no exista, el servidor responderá con:

  no command named /COMANDO try with /help to see all commands

Siendo COMANDO el comando enviado por el usuario.

Si un usuario abandona la sala, el servidor informa a todos los usuarios de su
marcha.

Para enviar mensajes se acepta tanto pulsar el boton ENVIAR como pulsar la tecla
enter.

Tipos de mensaje:

  1. hello: el mensaje que envia el cliente al servidor, con el nick que se
     quiere utilizar.

  2. welcome: mensaje que envia el servidor como respuesta al mensaje hello, si
     el nickname que envia el cliente no se repite.

  3. used: mensaje que envia el servidor como respuesta al mensaje hello, si
     el nickname que envia el cliente se repite.

  4. msg: mensaje que envia el cliente al resto de clientes.

  5. cmd: mensaje para el uso de los comandos descritos arriba.

  6. disconnect: mensaje que envia el cliente al servidor cuando se desconecta,
     el servidor envia un mensaje msg a todos los clientes indicando su marcha.

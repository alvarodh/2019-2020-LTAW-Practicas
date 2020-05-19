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

'use strict';

var isInitiator;

window.room = prompt("room name: ");  //index.html에서 learning-point라는 문구를 누르면 입력받는다.

var socket = io.connect();

if (room !== "") {
  console.log('Message from client: Asking to join room ' + room);
  socket.emit('create or join', room);
}

socket.on('created', function(room, clientId) {
  isInitiator = true;
});

socket.on('full', function(room) {
  console.log('Message from client: Room ' + room + ' is full :^(');
});

socket.on('ipaddr', function(ipaddr) {
  console.log('Message from client: Server IP address is ' + ipaddr);
});

socket.on('joined', function(room, clientId) {
  isInitiator = false;
});

socket.on('log', function(array) {
  console.log.apply(console, array);
});
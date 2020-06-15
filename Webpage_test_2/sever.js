var static = require('node-static');
var http = require('http');
var file = new(static.Server)();
var app = http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(2013);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket){

  // 로그 서버와 클라이언트로 메세지를 전송하는 편의 함수
  function log(){
    var array = ['>>> Message from server: '];
    for (var i = 0; i < arguments.length; i++) {
      array.push(arguments[i]);
    }
      socket.emit('log', array);
  }

  socket.on('message', function (message) {
    log('Got message:', message);
    // 실제 앱에서는 방이 될 것입니다. (브로드캐스팅이 아니라)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function (room) {
    var numClients = io.sockets.clients(room).length;

    log('Room ' + room + ' has ' + numClients + ' client(s)');
    log('Request to create or join room ' + room);

    if (numClients === 0){
      socket.join(room);
      socket.emit('created', room);
    } else if (numClients === 1) {
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room);
    } else { // max two clients
      socket.emit('full', room);
    }
    socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
    socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);

  });

});

console.log('sever connect!');

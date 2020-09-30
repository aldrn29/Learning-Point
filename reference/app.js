var express = require("express");
// var mysql=require('mysql');
var app=express();
var server=require('https').createServer(app);
/*
Stream = require('node-rtsp-stream');
stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://192.168.0.62:8554/',
    wsPort: 9999
});
*/
//var port=process.env.PORT||3000;
var routes = require("routes");
//var http = require("http");
var https = require('https');
//var path = require("path");
var fs = require('fs');
var dgram = require('dgram');
//var mysql = require('mysql');
/*
var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : '870218sg',
    database:'chatting'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});
*/

var room_info;

var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'suhyun'
};
//var port1 = 80;
var port2 = 8443;


var app = express();
var httpsServer = https.createServer(options, app).listen(port2, function(){
    console.log("https server listening on port " + port2);
});
var io = require("socket.io").listen(httpsServer);

/*
var client=mysql.createConnection({
  host    :'192.168.0.222',
  port : 3306,
  user : 'root',
  password : 'mini1004',
  database:'chat'
})
*/
const multer = require('multer');
// 기타 express 코드

const path=require('path');
const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'uploads/');
        },
        filename:function(req,file,cb){
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        },

    }),

});

app.get('/a',function(req,res){
    res.sendFile(path.join(__dirname + '/audio-master.html'));
});

app.get('/h',function(req,res){
    res.sendFile(path.join(__dirname + '/HL-master.html'));
});

app.get('/c',function(req,res){
    res.sendFile(path.join(__dirname + '/collabo.html'));
});

//const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });
app.post('/up', upload.single('img'), (req, res) => {
    console.log(req.file.path);
    io.sockets.emit("session1", req.file.path);
    res.end("success!");
});


app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
/*
var httpServer = http.createServer(app).listen(8081, function(req, res){
	console.log("Socket IO Server has been started");
});
*/
io.sockets.on("connection", function(socket){
    var room;
//	console.log(socket);
    socket.on("session1", function(data){
        console.log(data);
        socket.broadcast.emit("session1", data);
        socket.emit("session1", data);
        console.log("Message from client:" + data.msg);
        var msgArr = data.msg.split(":")
        var nickname = msgArr[0]
        var context = msgArr[1]
        /*
        client.query('insert into chat(nickname, context) values ("'+nickname+'","'+context+'");',function(err,result1){
            if(err) throw err;
        })
        */
    });

    socket.on("session2", function(data){
        console.log(data);
        socket.broadcast.emit("session2", data);
        socket.emit("session2", data);
        console.log("Message from client:" + data.msg);
    });
    socket.on("joint-accept", function(data){
        console.log(data);
        socket.broadcast.emit("joint-accept", data);
    });
    socket.on("session3", function(data){
        console.log(data);
        socket.broadcast.emit("session3", data);
        socket.emit("session3", data);
        console.log("Message from client:" + data.msg);
    });

    /*-----------------합동방송 소켓----------------------------*/
// convenience function to log server messages on the client
    function log() {
        var array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }

    socket.on('message', function(message) {
        log('Client said: ', message);
        // for a real app, would be room-only (not broadcast)
        socket.broadcast.emit('message', message);
    });

    socket.on('create or join', function(room) {
        log('Received request to create or join room ' + room);

        var clientsInRoom = io.sockets.adapter.rooms[room];
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        log('Room ' + room + ' now has ' + numClients + ' client(s)');

        if (numClients === 0) {
            socket.join(room);
            log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);
        } else if (numClients === 1) {
            log('Client ID ' + socket.id + ' joined room ' + room);
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.sockets.in(room).emit('ready', room);
            socket.broadcast.emit('ready', room);
        } else { // max two clients
            socket.emit('full', room);
        }
    });

    socket.on('ipaddr', function() {
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
            ifaces[dev].forEach(function(details) {
                if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                    socket.emit('ipaddr', details.address);
                }
            });
        }
    });

    socket.on('disconnect', function(reason) {
        console.log(`Peer or server disconnected. Reason: ${reason}.`);
        socket.broadcast.emit('bye');
    });

    socket.on('bye', function(room) {
        console.log(`Peer said bye on room ${room}.`);
    });

    socket.on('request', function(room) {
        socket.broadcast.emit("getRequest", room);
        room_info = room;
    });

    socket.on('response', function(room, isGrant) {
        if(isGrant) {
            socket.broadcast.emit("getResponse", room, isGrant);
            socket.emit("enter", room);
        } else {
            // TODO 거절 했을 때 서버 side
        }
    });

    socket.on('enter', function (room, id) {
        socket.emit("collabo", room);
        console.log("enter: " + room);
    });

    socket.on("onCollabo", function(id) {
        socket.emit("collabo", room_info);
    });
});

var udpHost = "0.0.0.0";
var udpPort1 = 20001;
var udpPort2 = 20002;
var udpPort3 = 20003;
/*
var udpPort4 = 20004;
*/

var udpServer1 = dgram.createSocket('udp4');
var udpServer2 = dgram.createSocket('udp4');
var udpServer3 = dgram.createSocket('udp4');
//var udpServer4 = dgram.createSocket('udp4');

udpServer1.on('listening', function() {
    var addr = udpServer1.address();
    console.log('UDP Server listening port : ' + addr.port);
});
udpServer1.on('message', function(msg, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + msg);
    io.sockets.emit("session1-tag", {"msg": msg});
});
udpServer1.bind(udpPort1, udpHost);

udpServer2.on('listening', function() {
    var addr = udpServer2.address();
    console.log('UDP Server listening port : ' + addr.port);
});
udpServer2.on('message', function(msg, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + msg);
    io.sockets.emit("session2-tag", {"msg": msg});
});
udpServer2.bind(udpPort2, udpHost);

udpServer3.on('listening', function() {
    var addr = udpServer3.address();
    console.log('UDP Server listening port : ' + addr.port);
});
udpServer3.on('message', function(msg, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + msg);
    io.sockets.emit("session3-tag", {"msg": msg});
});
udpServer3.bind(udpPort3, udpHost);
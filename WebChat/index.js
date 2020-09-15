var app = require('express')()
var http = require('http').Server(app)
const io = require('socket.io')(http)
// const RTCMultiConnectionServer = require('rtcmulticonnection-server')

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})
io.on('connection', function(socket){
    // RTCMultiConnectionServer.addSocket(socket)
    console.log('a user connected')
    socket.on('chat message', function(msg){
        io.emit('chat message', msg)
        console.log('message:' + msg)
    })
})
http.listen(3000,function(){
    console.log('listening on *:3000')
})
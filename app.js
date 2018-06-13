var express=require('express');
var socket=require('socket.io');
var app=express();
var server=app.listen(4000,function(){
  console.log("listening to port 4000!");
});

// static files
app.use(express.static('public'));

var io=socket(server);
var map={};
io.on('connection',function(socket){
console.log("Made a connection!");
socket.on('chat',function(data){
io.sockets.emit('chat',data);
});

socket.on('typing',function(data){
 socket.broadcast.emit('typing',data);
});

});


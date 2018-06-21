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
var available=0;
var available_id;
io.on('connection',function(socket){
console.log("Made a connection!");

// check if socket id is available in the map

if(!(socket.id in map)){
 var va;
 io.to(socket.id).emit('look_connection',va);
     if(available)
    {
	    map[socket.id]=available_id;
	    map[available_id]=socket.id;
	    available=0;
	    var val;
	    io.to(socket.id).emit('made_connection',val);
	    io.to(map[socket.id]).emit('made_connection',val);
    }
    else
    {
	    available=1;
	    available_id=socket.id;
    }
}

//if socket id is available , let them communicate


socket.on('chat',function(data){
io.to(map[socket.id]).emit('chat',data);
io.to(socket.id).emit('your_chat',data);
});

socket.on('typing',function(data){
 io.to(map[socket.id]).emit('typing',data);
});

socket.on('disconnect',function(data){
 if(available_id==socket.id)
 {
 	available=0;
 	available_id="";
 }
 io.to(map[socket.id]).emit('disconnect',data);
 io.to(socket.id).emit('you_disconnect',data);
 delete map[map[socket.id]];
 delete map[socket.id];
});


});
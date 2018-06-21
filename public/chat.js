var hanldeStatus=0;
function setSession(socket){
var message=document.getElementById('message');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var output1=document.getElementById('output1');
var feedback=document.getElementById('feedback');
btn.addEventListener('click',function(){
   socket.emit('chat',{
   message:message.value,
   });
   message.value=" ";
	});

message.addEventListener('keypress',function(){
 var va;
 if(message.value.length!=0)	
 socket.emit('typing',va);
 else
 feedback.innerHTML="";	
});

socket.on('chat',function(data){
feedback.innerHTML="";	
output.innerHTML+='<p align="right"><strong>'+"Stranger"+'</strong>'+'</p>'+'<div class="message other-message" width: 100px;>'+ data.message+'</div>';
});

socket.on('your_chat',function(data){
feedback.innerHTML="";	
output.innerHTML+='<p><strong>'+"You"+'</strong>'+'</p>'+'<div class="message my-message" width: 100px;>'+ data.message+'</div>';
});

socket.on('typing',function(data){
 feedback.innerHTML='<p style="color:#467a46;"><strong><em>'+"Stranger"+' is typing a message...  </em></strong></p>';
});

socket.on('disconnect',function(data){
 feedback.innerHTML='<p style="color:#992d2d;"><strong><em>'+'Stranger has disconnected.Please reload the page to start a new conversation.  </em></strong></p>';
});

socket.on('you_disconnect',function(data){
 feedback.innerHTML='<p style="color:#992d2d;"><strong><em>'+'You are disconnected.Please reload the page to start a new conversation.  </em></strong></p>';
});

socket.on('look_connection',function(data){
 feedback.innerHTML='<p style="color:#992d2d;"><strong><em>'+'Looking for someone to connect...  </em></strong></p>';
});

socket.on('made_connection',function(data){
 feedback.innerHTML='<p style="color:#467a46;"><strong><em>'+'You are now connected to a stranger.Say Hi!  </em></strong></p>';
});

}
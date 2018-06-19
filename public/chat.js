var hanldeStatus=0;
function setSession(socket){
var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var output1=document.getElementById('output1');
var feedback=document.getElementById('feedback');
btn.addEventListener('click',function(){
	if(!hanldeStatus)
	{
		hanldeStatus=1;
		handle.readOnly="readonly";
	}
   socket.emit('chat',{
   message:message.value,
   handle:handle.value
   });
   message.value=" ";
	});

message.addEventListener('keypress',function(){
 if(message.value.length!=0)	
 socket.emit('typing',handle.value);
 else
 feedback.innerHTML="";	
});

socket.on('chat',function(data){
feedback.innerHTML="";	
output.innerHTML+='<p><strong>'+data.handle+'</strong>'+'</p>'+'<div class="message my-message" width: 100px;>'+ data.message+'</div>';
});

socket.on('typing',function(data){
 feedback.innerHTML='<p><em>'+data+' is typing a message...  </em></p>';
});

}
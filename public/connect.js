var dis_socket;
        function letusConnect() {
            var socket=io.connect('https://dingg.herokuapp.com/');
            dis_socket=socket;
            document.getElementById("connect").style.display= "none";
            document.getElementById("disconnect").style.display= "block";
            document.getElementById("boxchat").style.display= "block";
            document.getElementById("disconnect").style.left= "10px";
            document.getElementById("chat").style.filter= "blur(0)";
            setSession(socket);
        }
        function letusDisconnect() {
            var val;
            dis_socket.emit('disconnect',val);
            dis_socket.disconnect();
        }
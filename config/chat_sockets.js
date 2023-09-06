//this is is server side file
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer); // this receives the request for connection

    io.sockets.on('connection',function(socket){ //once connection is established it emits a message to connectionHandler in chat_engine.js 
        //saying connection is done
        console.log(" new connection received ",socket.id);

        socket.on('disconnect',function(){
            console.log('connection disconnected');
        });

        socket.on('join_room', function(data){
            console.log('joining request received ',data);
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message',function(data){
            console.log("i sent the message",data);
            io.in(data.chatroom).emit('receive_message',data);
        })
    })
}



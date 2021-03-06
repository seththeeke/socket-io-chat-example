var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//sends an index.html file to the client given the user routes to a directory
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

// When a user connects
io.on('connection', function(socket){

    // tell users that someone has entered
    socket.on('user entered', function(nickname){
        io.emit('user entered', nickname);
    });

    // When a message is sent
    socket.on('chat message', function(msg){
        // inform the users a message was sent
        io.emit('chat message', msg);
    });

    // When a user disconnects
    socket.on('disconnect', function(){
        // inform the users a user disconnected
        io.emit('user disconnected');
    });

    socket.on('user typing', function(nickname){
        io.emit('user typing', nickname);
    });

});

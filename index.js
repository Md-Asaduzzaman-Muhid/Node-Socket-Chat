var express = require('express');
var socket = require ('socket.io');

var app = express();

var server = app.listen(4000,function(){
    console.log('Listening to port 4000');
});

app.use(express.static('public'));

app.get('/login', (req, res)=>{
    res.render('login.ejs');
});
app.get('/register', (req, res)=>{
    res.render('register.ejs');
});


//Socket
var io = socket(server);
io.on('connection', function(socket){
    console.log('Current socket ID : ', socket.id)

    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing',data);
    });
});
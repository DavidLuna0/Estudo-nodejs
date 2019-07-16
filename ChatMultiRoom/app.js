const app = require('./config/server');

const server = app.listen(8081, function() {
    console.log("Servidor online");
});

const io = require('socket.io').listen(server);
app.set('io', io);
io.on('connection', function(socket){
    console.log('Usuario conectou')

    socket.on('disconnect', function() {
        console.log('Usuario desconectou');
    })
})
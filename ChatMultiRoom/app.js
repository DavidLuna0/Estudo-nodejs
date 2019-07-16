const app = require('./config/server');

const server = app.listen(8081, function() {
    console.log("Servidor online");
});

var io = require('socket.io').listen(server);
app.set('io', io);
io.on('connection', function(socket){
    console.log('Usuario conectou')

    socket.on('disconnect', function() {
        console.log('Usuario desconectou');
    })

    socket.on('msgParaServidor', function(data) {
        
        socket.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}  
        );

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}  
        );


        if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}  
            );
    
            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}  
            );
        }
    
    });
})